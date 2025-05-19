using OpenAIapi.Models;

namespace OpenAIapi.Services
{
    public interface IGeminiNutritionService
    {
        Task<NutritionReportResult> GenerateNutritionReportAsync(string foodText);
    }
}
