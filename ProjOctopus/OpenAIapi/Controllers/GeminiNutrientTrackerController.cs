using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using OpenAIapi.Models;
using System.Text.RegularExpressions;
using OpenAIapi.Services;
using Microsoft.AspNetCore.Authorization;

namespace OpenAIapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeminiNutrientTrackerController : ControllerBase
    {
        private readonly IGeminiNutritionService nutritionService;

        public GeminiNutrientTrackerController(IGeminiNutritionService nutritionService)
        {
            this.nutritionService = nutritionService;
        }

        [Authorize]
        [HttpPost("generate-nutrition-report")]
        public async Task<IActionResult> GenerateNutritionReport([FromBody] FoodDietInputModel foodListText)
        {
            if (string.IsNullOrWhiteSpace(foodListText?.Text))
            {
                return BadRequest("Please provide the food items as a single string.");
            }

            try
            {
                NutritionReportResult result = await nutritionService.GenerateNutritionReportAsync(foodListText.Text);

                if (result.IsValidJson && result.Items != null)
                {
                    return Ok(result.Items);
                }
                else
                {
                    return Ok(new
                    {
                        message = "Response was not a structured nutrition report.",
                        rawResponse = result.RawResponse
                    });
                }
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(502, "Error communicating with Gemini API: " + ex.Message);
            }
            catch (JsonException ex)
            {
                return StatusCode(500, "Failed to parse nutrition report: " + ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(500, "Gemini API returned an invalid response: " + ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred: " + ex.Message);
            }
        }
    }
}

#region inputs

//{
//    "foodText": "string"
//}

//apple, 2 bananas, 1 cup of rice, chicken breast, some spinach
//1 large orange, 300g salmon, 50g almonds, 2 slices of whole wheat bread, 1 glass of milk
//oatmeal, blueberries, coffee, eggs, yogurt
//I had an avocado, then some pasta, and a piece of chocolate
//a medium apple, two standard bananas, 150 grams of cooked rice, one chicken breast fillet, a handful of raw spinach

#endregion
#region Notes-- 

// BASE URL
// "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY"
// 
//This code represents a workflow for making a request to the Gemini API, extracting and processing the response, and returning the data in a structured format.First, it serializes the `requestBody` object into JSON and prepares it for an HTTP POST request by setting the content type to "application/json" and encoding it in UTF - 8.The request is sent asynchronously to a specific Gemini API endpoint, using the model and API key as part of the URL.Once the response is received, the code ensures that it was successful by calling `EnsureSuccessStatusCode()`. The entire response body is read as a string(`responseJson`) and then deserialized into a `GeminiResponseModel` object.

//The response is checked to ensure it contains valid data, specifically verifying the presence of `Candidates` and their `Content.Parts`. If these are missing or invalid, a 500 error is returned indicating a failure in retrieving a valid response from the Gemini API.If the data is valid, the code extracts the first `Text` element from the response, which may contain JSON wrapped in a markdown code block(`json\n...\n`). A regex pattern is used to capture this JSON string, and if successfully extracted, it is deserialized into an object and returned as raw JSON in the HTTP response.If the response does not follow this markdown format, the code attempts to parse the text directly as JSON.If parsing fails, another 500 error is returned with details about the raw response.This process ensures that the extracted data is returned in a consistent format while handling any potential errors in the API response.

#endregion
