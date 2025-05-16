using OpenAIapi.Models;

namespace OpenAIapi.Services
{
    public interface IGeminiNutritionService
    {
        Task<List<FoodReportItem>> GenerateNutritionReportAsync(string foodText);
    }
}
