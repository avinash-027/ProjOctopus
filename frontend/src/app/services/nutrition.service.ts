import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface NutritionRequest {
  text: string;
  weightKg: number;
  heightCm: number;
  age: number;
  gender: string;
  healthConditions: string[];
}

export interface NutritionReport {
  message: string;
  rawResponse?: string;
  foodItems: NutritionItem[];
}

export interface NutritionItem {
  foodName: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  servingSize: string;
  vitamins?: string; // keep as string (comma-separated)
  minerals?: string; // optional
  canConsume?: boolean;
  reason?: string;
  suggestions?: string[];
}

@Injectable({
  providedIn: "root",
})
export class NutritionService {
  private apiUrl =
    "http://localhost:5247/api/GeminiNutrientTracker/generate-nutrition-report";

  constructor(private http: HttpClient) {}

  generateNutritionReport(
    request: NutritionRequest
  ): Observable<NutritionReport> {
    const apiRequest = {
      Text: request.text,
      WeightKg: request.weightKg,
      HeightCm: request.heightCm,
      Age: request.age,
      Gender: request.gender,
      HealthConditions: request.healthConditions,
    };

    return this.http.post<NutritionReport>(this.apiUrl, apiRequest);
  }
}
