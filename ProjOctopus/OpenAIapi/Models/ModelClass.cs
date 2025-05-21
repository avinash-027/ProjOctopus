namespace OpenAIapi.Models
{
    public class NutritionReportResult
    {
        public bool IsValidJson { get; set; }
        public List<FoodReportItem>? Items { get; set; }
        public string RawResponse { get; set; } = string.Empty;
    }
    public class FoodDietInputModel
    {
        public required string Text { get; set; }
        public required float WeightKg { get; set; }
        public required float HeightCm { get; set; }
        public required int Age { get; set; }
        public required string Gender { get; set; }
        public required List<string> HealthConditions { get; set; }
    }
    public class FoodReportItem
    {
        public string foodName { get; set; }
        public double calories { get; set; }
        public double protein_g { get; set; }
        public double carbs_g { get; set; }
        public double fats_g { get; set; }
        public string servingSize { get; set; }
        public string vitamins { get; set; }
        public bool canConsume { get; set; }
        public string reason { get; set; }
        public List<string> suggestions { get; set; }
    }
    
    public class GeminiResponseModel
    {
        public List<Candidate> Candidates { get; set; }
    }

    public class Candidate
    {
        public Content Content { get; set; }
    }

    public class Content
    {
        public List<Part> Parts { get; set; }
    }

    public class Part
    {
        public string Text { get; set; }
    }
}