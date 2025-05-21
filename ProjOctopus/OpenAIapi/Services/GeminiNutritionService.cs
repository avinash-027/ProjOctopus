using OpenAIapi.Models;
using System.Net.Http;
using System.Reflection;
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
        private static bool IsPlaceholderText(string text)
        {
            var placeholders = new[] { "string", "text", "enter food", "enter food here", "type here", "example", "default" };
            return placeholders.Any(p => string.Equals(text.Trim(), p, StringComparison.OrdinalIgnoreCase));
        }
        public static string GenerateNutritionPrompt(FoodDietInputModel model)
        {
            string prompt;
            var userDetails = $"The user is a {model.Age}-year-old weighing {model.WeightKg}kg, height {model.HeightCm}cm. " +
                              $"Health conditions: {string.Join(", ", model.HealthConditions ?? new List<string>())}.";

            if (string.IsNullOrWhiteSpace(model.Text) || IsPlaceholderText(model.Text))
            {
                prompt = $"Analyze the following food items(INPUT): TAKE a randamly 5 food items from 1-day sample diet plan" +
                         $"If no specific quantity or unit is mentioned for an item, assume a **standard single serving size** for that food. " +
                         $"Provide a structured JSON array containing (for each item) the foodName, calories, protein_g, carbs_g, fats_g, " +
                         $"servingSize, vitamins, and a canConsume boolean and reason string explaining if it's suitable based on user's health " +
                         $"and body profile & INPUT. Additionally, include a 'suggestions' property as a list of 2-3 health diet suggestions related to these foods. " +
                         $"Ensure all numeric values (e.g., calories, protein_g, carbs_g, fats_g) are formatted to 2 decimal places.\n\n" +
                         $"{userDetails}";

                prompt += "\nMAKE SURE TO GENERATE JUST ONLY THE BELLOW JSON FORMAT";

                prompt += "\nOutput ONLY a valid JSON array like: [ { \"foodName\": \"Apple\", \"calories\": 95, \"protein_g\": 0.5, \"carbs_g\": 25, \"fats_g\": 0.3, \"servingSize\": \"1 medium (182g)\", \"vitamins\": \"C, A\", \"canConsume\": true, \"reason\": \"Suitable for most diets.\", \"suggestions\": [\"Enjoy as a snack to boost fiber intake.\", \"Pair with nuts for a balanced snack.\"] }, ... ]";
            }
            else
            {
                // Analyze specific food items entered by the user
                prompt = $"Analyze the following food items(INPUT): \"{model.Text.Trim()}\". " +
                         $"If no specific quantity or unit is mentioned for an item, assume a **standard single serving size** for that food. " +
                         $"Provide a structured JSON array containing (for each item) the foodName, calories, protein_g, carbs_g, fats_g, " +
                         $"servingSize, vitamins, and a canConsume boolean and reason string explaining if it's suitable based on user's health " +
                         $"and body profile & INPUT. Additionally, include a 'suggestions' property as a list of 2-3 health diet suggestions related to these foods. " +
                         $"Ensure all numeric values (e.g., calories, protein_g, carbs_g, fats_g) are formatted to 2 decimal places.\n\n" +
                         $"{userDetails}";

                prompt += "\nIf the input is not related to food or nutrition, or it's casual conversation, respond with a friendly message like: " +
                          "'Hi there! I'm your Nutrition Assistant. Tell me what you've eaten, and I'll break down the nutritional info for you!'";

                prompt += "\nOutput ONLY a valid JSON array like: [ { \"foodName\": \"Apple\", \"calories\": 95, \"protein_g\": 0.5, \"carbs_g\": 25, \"fats_g\": 0.3, \"servingSize\": \"1 medium (182g)\", \"vitamins\": \"C, A\", \"canConsume\": true, \"reason\": \"Suitable for most diets.\", \"suggestions\": [\"Enjoy as a snack to boost fiber intake.\", \"Pair with nuts for a balanced snack.\"] }, ... ]";
            }
            return prompt;
        }

        public async Task<string> CallGeminiGenerateContentAsync(string prompt)
        {
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

            return geminiOutputText;
        }

        public async Task<NutritionReportResult> GenerateNutritionReportAsync(FoodDietInputModel model)
        {
            string prompt = GenerateNutritionPrompt(model);
            string geminiOutputText = await CallGeminiGenerateContentAsync(prompt);

            // This pattern is meant to extract a JSON block enclosed in a markdown-style code
            // Tries to extract JSON block wrapped in triple backticks (common in LLM output).
            var match = Regex.Match(geminiOutputText, @"```json\n([\s\S]*?)\n```");
            var nutritionReportJson = match.Success ? match.Groups[1].Value : geminiOutputText.Trim();

            var result = new NutritionReportResult
            {
                RawResponse = nutritionReportJson,
                Items = new List<FoodReportItem>()
            };

            // Only try parsing if it looks like JSON
            if (nutritionReportJson.StartsWith("{") || nutritionReportJson.StartsWith("["))
            {
                try
                {
                    var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                    result.Items = JsonSerializer.Deserialize<List<FoodReportItem>>(nutritionReportJson, options);
                    result.RawResponse = "RawResponse is parsed as it looks like JSON";
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
