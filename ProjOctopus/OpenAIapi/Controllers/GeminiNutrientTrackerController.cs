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

#region pre-inputs

//apple, 2 bananas, 1 cup of rice, chicken breast, some spinach
//1 large orange, 300g salmon, 50g almonds, 2 slices of whole wheat bread, 1 glass of milk
//oatmeal, blueberries, coffee, eggs, yogurt
//I had an avocado, then some pasta, and a piece of chocolate
//a medium apple, two standard bananas, 150 grams of cooked rice, one chicken breast fillet, a handful of raw spinach

#endregion

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

        //[Authorize]
        [HttpPost("generate-nutrition-report")]
        public async Task<IActionResult> GenerateNutritionReport([FromBody] FoodDietInputModel model)
        {
            try
            {
                NutritionReportResult result = await nutritionService.GenerateNutritionReportAsync(model);
                return Ok(new
                {
                    message = result.IsValidJson ? "Structured nutrition report generated." : "Unstructured output from Gemini.",
                    rawResponse = result.RawResponse,
                    foodItems = result.Items
                });
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

