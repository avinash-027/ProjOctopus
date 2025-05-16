namespace OpenAIapi.Services
{
    public interface IGeminiNutritionService
    {
        Task<object> GenerateNutritionReportAsync(string foodText);
    }
}
