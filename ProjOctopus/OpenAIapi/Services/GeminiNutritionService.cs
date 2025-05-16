using OpenAIapi.Models;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace OpenAIapi.Services
{
    public class GeminiNutritionService : IGeminiNutritionService
    {
        private readonly HttpClient _httpClient;
        private readonly string _geminiApiKey;
        private readonly string _geminiModel = "gemini-2.0-flash";

        public GeminiNutritionService(IConfiguration configuration, HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://generativelanguage.googleapis.com/v1beta/");
            _geminiApiKey = configuration["GeminiApiKey"]!;
        }

        public async Task<object> GenerateNutritionReportAsync(string foodText)
        {
            var prompt = $"Analyze the following food items: \"{foodText.Trim()}\". If no specific quantity or unit is mentioned for an item, assume a **standard single serving size** for that food. Provide a structured JSON array containing the foodName, calories, protein_g, carbs_g, fats_g, servingSize, and vitamins for each. Additionally, include a 'suggestions' property as a list of 2-3 health diet suggestions related to these foods.";
            prompt += "\nOutput ONLY a valid JSON array like: [ { \"foodName\": \"Apple\", \"calories\": 95, \"protein_g\": 0.5, \"carbs_g\": 25, \"fats_g\": 0.3, \"servingSize\": \"1 medium (182g)\", \"vitamins\": \"C, A\", \"suggestions\": [\"Enjoy as a snack to boost fiber intake.\", \"Pair with nuts for a balanced snack.\"] }, ... ]";

            var requestBody = new
            {
                contents = new[] {
                new
                {
                    parts = new[]
                    {
                        new { text = prompt }
                    }
                }
            }};

            var jsonRequestBody = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json");

            var requestUri = $"models/{_geminiModel}:generateContent?key={_geminiApiKey}";
            var response = await _httpClient.PostAsync(requestUri, content);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync();

            var geminiResponse = JsonSerializer.Deserialize<GeminiResponseModel>(responseJson, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (geminiResponse?.Candidates == null || !geminiResponse.Candidates.Any() || geminiResponse.Candidates[0].Content?.Parts == null || !geminiResponse.Candidates[0].Content.Parts.Any())
            {
                throw new InvalidOperationException("Failed to get a valid response from Gemini API.");
            }

            var geminiOutputText = geminiResponse.Candidates[0].Content.Parts[0].Text;

            var match = Regex.Match(geminiOutputText, @"```json\n([\s\S]*?)\n```");
            if (match.Success)
            {
                var nutritionReportJson = match.Groups[1].Value;
                return JsonSerializer.Deserialize<object>(nutritionReportJson)!;
            }
            else
            {
                try
                {
                    return JsonSerializer.Deserialize<object>(geminiOutputText)!;
                }
                catch (JsonException ex)
                {
                    throw new JsonException("Failed to parse nutrition report from Gemini API response.", ex);
                }
            }
        }
    }
}
