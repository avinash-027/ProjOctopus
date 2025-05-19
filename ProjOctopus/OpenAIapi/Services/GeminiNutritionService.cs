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

        public async Task<NutritionReportResult> GenerateNutritionReportAsync(string foodText)
        {
            var prompt = $"Analyze the following food items(INPUT): \"{foodText.Trim()}\". If no specific quantity or unit is mentioned for an item, assume a **standard single serving size** for that food. Provide a structured JSON array containing the foodName, calories, protein_g, carbs_g, fats_g, servingSize, and vitamins for each. Additionally, include a 'suggestions' property as a list of 2-3 health diet suggestions related to these foods. Ensure all numeric values (e.g., calories, protein_g, carbs_g, fats_g) are formatted to 2 decimal places (e.g., 25.00).";
            prompt += "\nOutput ONLY a valid JSON array like: [ { \"foodName\": \"Apple\", \"calories\": 95, \"protein_g\": 0.5, \"carbs_g\": 25, \"fats_g\": 0.3, \"servingSize\": \"1 medium (182g)\", \"vitamins\": \"C, A\", \"suggestions\": [\"Enjoy as a snack to boost fiber intake.\", \"Pair with nuts for a balanced snack.\"] }, ... ]";
            prompt += "\n\nIf the input is not related to food or nutrition, or if it's a casual conversation, respond with a friendly message indicating that you can process food-related requests for nutrition analysis. For example, 'Hi, I can help with food and nutrition analysis! What food items are you curious about today?' or 'My expertise is in nutrition. Could you please tell me about the food items you'd like analyzed?'";

            // Build Request Body
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
            }
            };

            var jsonRequestBody = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json");

            // Send API Request
            var requestUri = $"models/{_geminiModel}:generateContent?key={_geminiApiKey}";
            var response = await _httpClient.PostAsync(requestUri, content);
            response.EnsureSuccessStatusCode();

            // Parse Gemini API Response
            var responseJson = await response.Content.ReadAsStringAsync();
            var geminiResponse = JsonSerializer.Deserialize<GeminiResponseModel>(responseJson, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (geminiResponse?.Candidates == null || !geminiResponse.Candidates.Any() || geminiResponse.Candidates[0].Content?.Parts == null || !geminiResponse.Candidates[0].Content.Parts.Any())
            {
                throw new InvalidOperationException("Failed to get a valid response from Gemini API.");
            }

            // Extract JSON Output
            var geminiOutputText = geminiResponse.Candidates[0].Content.Parts[0].Text;

            // Tries to extract JSON block wrapped in triple backticks (common in LLM output).
            // This pattern is meant to extract a JSON block enclosed in a markdown-style code
            var match = Regex.Match(geminiOutputText, @"```json\n([\s\S]*?)\n```");
            var nutritionReportJson = match.Success ? match.Groups[1].Value : geminiOutputText.Trim();

            var result = new NutritionReportResult
            {
                RawResponse = nutritionReportJson
            };

            // Only try parsing if it looks like JSON
            if (nutritionReportJson.StartsWith("{") || nutritionReportJson.StartsWith("["))
            {
                try
                {
                    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                    result.Items = JsonSerializer.Deserialize<List<FoodReportItem>>(nutritionReportJson, options);
                    result.IsValidJson = result.Items != null;
                }
                catch (JsonException)
                {
                    result.IsValidJson = false;
                }
            }
            return result;
        }
    }
}
