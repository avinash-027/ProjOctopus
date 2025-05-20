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
        public string Text { get; set; }
    }
    public class FoodReportItem
    {
        public string FoodName { get; set; }
        public double Calories { get; set; }
        public double protein_g { get; set; }
        public double carbs_g { get; set; }
        public double fats_g { get; set; }
        public string ServingSize { get; set; }
        public string Vitamins { get; set; }
        public List<string> Suggestions { get; set; }
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