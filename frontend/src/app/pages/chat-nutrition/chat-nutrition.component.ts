import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  NutritionService,
  NutritionItem,
  NutritionReport,
} from "../../services/nutrition.service";

@Component({
  selector: "app-chat-nutrition",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-[#e0e1ddff] mb-8">
          Nutrition Analysis
        </h1>

        <div class="card mb-8">
          <h2 class="text-xl font-semibold text-[#e0e1ddff] mb-4">
            Describe Your Meal
          </h2>

          <form
            [formGroup]="nutritionForm"
            (ngSubmit)="onSubmit()"
            class="space-y-6"
          >
            <div class="form-group">
              <label for="text" class="form-label">Meal Description</label>
              <textarea
                id="text"
                formControlName="text"
                rows="4"
                placeholder="Describe your meal in detail (e.g., 2 eggs, 2 slices of whole wheat toast with butter, and a cup of coffee with milk)"
                class="input-field"
              ></textarea>
              <div *ngIf="submitted && f['text'].errors" class="form-error">
                Please describe your meal
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label for="weightKg" class="form-label">Weight (kg)</label>
                <input
                  type="number"
                  id="weightKg"
                  formControlName="weightKg"
                  class="input-field"
                />
                <div
                  *ngIf="submitted && f['weightKg'].errors"
                  class="form-error"
                >
                  <span *ngIf="f['weightKg'].errors?.['required']"
                    >Weight is required</span
                  >
                  <span
                    *ngIf="f['weightKg'].errors?.['min'] || f['weightKg'].errors?.['max']"
                  >
                    Weight must be between 20 and 300 kg
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label for="heightCm" class="form-label">Height (cm)</label>
                <input
                  type="number"
                  id="heightCm"
                  formControlName="heightCm"
                  class="input-field"
                />
                <div
                  *ngIf="submitted && f['heightCm'].errors"
                  class="form-error"
                >
                  <span *ngIf="f['heightCm'].errors?.['required']"
                    >Height is required</span
                  >
                  <span
                    *ngIf="f['heightCm'].errors?.['min'] || f['heightCm'].errors?.['max']"
                  >
                    Height must be between 100 and 250 cm
                  </span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group">
                <label for="age" class="form-label">Age</label>
                <input
                  type="number"
                  id="age"
                  formControlName="age"
                  class="input-field"
                />
                <div *ngIf="submitted && f['age'].errors" class="form-error">
                  <span *ngIf="f['age'].errors?.['required']"
                    >Age is required</span
                  >
                  <span
                    *ngIf="f['age'].errors?.['min'] || f['age'].errors?.['max']"
                  >
                    Age must be between 1 and 120 years
                  </span>
                </div>
              </div>

              <div class="form-group">
                <label for="gender" class="form-label">Gender</label>
                <select
                  id="gender"
                  formControlName="gender"
                  class="input-field"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <div *ngIf="submitted && f['gender'].errors" class="form-error">
                  Please select a gender
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Health Conditions</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <div
                  *ngFor="let condition of healthConditionsList"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    [id]="condition"
                    [value]="condition"
                    (change)="onHealthConditionChange($event)"
                    class="mr-2 h-4 w-4 text-[#415a77ff]"
                  />
                  <label [for]="condition" class="text-[#e0e1ddff]">{{
                    condition
                  }}</label>
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="btn btn-primary"
                [disabled]="isLoading"
              >
                <span
                  *ngIf="isLoading"
                  class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
                ></span>
                {{ isLoading ? "Analyzing..." : "Analyze Nutrition" }}
              </button>
            </div>
          </form>
        </div>

        <!-- Results Section -->
        <div *ngIf="report" class="card slide-in-up">
          <h2 class="text-xl font-semibold text-[#e0e1ddff] mb-6">
            Nutrition Report
          </h2>

          <!-- Display message and rawResponse -->
          <!-- <div
            class="mb-4 p-4 bg-[#0d1b2aff] rounded-md border border-[#415a77ff]"
          >
            <h3 class="text-lg font-semibold text-[#778da9ff] mb-2">Message</h3>
            <p class="text-[#e0e1ddff]">{{ report.message }}</p>
          </div> -->

          <!-- <div
            class="mb-6 p-4 bg-[#0d1b2aff] rounded-md border border-[#415a77ff]"
          >
            <h3 class="text-lg font-semibold text-[#778da9ff] mb-2">
              Raw Response
            </h3>
            <pre class="text-[#e0e1ddff] whitespace-pre-wrap">{{
              report.rawResponse
            }}</pre>
          </div> -->

          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-[#778da9ff]">Food Items</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                *ngFor="let item of report.foodItems"
                class="nutrition-item p-4 bg-[#0d1b2aff] rounded-md border border-[#415a77ff]"
              >
                <div
                  class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2"
                >
                  <h4 class="text-lg font-medium text-[#e0e1ddff]">
                    {{ item.foodName }}
                  </h4>
                  <span class="text-sm text-[#778da9ff]">{{
                    item.servingSize
                  }}</span>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div class="text-center p-2 rounded-md">
                    <p class="text-sm text-[#778da9ff]">Calories</p>
                    <p class="text-lg font-semibold text-[#e0e1ddff]">
                      {{ item.calories }}
                    </p>
                  </div>
                  <div class="text-center p-2 rounded-md">
                    <p class="text-sm text-[#778da9ff]">Protein</p>
                    <p class="text-lg font-semibold text-[#e0e1ddff]">
                      {{ item.protein_g }}g
                    </p>
                  </div>
                  <div class="text-center p-2 rounded-md">
                    <p class="text-sm text-[#778da9ff]">Carbs</p>
                    <p class="text-lg font-semibold text-[#e0e1ddff]">
                      {{ item.carbs_g }}g
                    </p>
                  </div>
                  <div class="text-center p-2 rounded-md">
                    <p class="text-sm text-[#778da9ff]">Fats</p>
                    <p class="text-lg font-semibold text-[#e0e1ddff]">
                      {{ item.fats_g }}g
                    </p>
                  </div>
                </div>

                <div *ngIf="item.vitamins" class="mb-2">
                  <p class="text-sm text-[#778da9ff]">
                    Vitamins:
                    <span class="text-[#e0e1ddff]">{{ item.vitamins }}</span>
                  </p>
                </div>

                <div *ngIf="item.minerals" class="mb-2">
                  <p class="text-sm text-[#778da9ff]">
                    Minerals:
                    <span class="text-[#e0e1ddff]">{{ item.minerals }}</span>
                  </p>
                </div>

                <div class="mb-2">
                  <p class="text-sm text-[#778da9ff]">
                    Can Consume:
                    <span
                      [ngClass]="
                        item.canConsume ? 'text-green-400' : 'text-red-400'
                      "
                    >
                      {{ item.canConsume ? "Yes" : "No" }}
                    </span>
                  </p>
                </div>

                <div class="mb-2">
                  <p class="text-sm text-[#778da9ff]">
                    Reason:
                    <span class="text-[#e0e1ddff]">{{ item.reason }}</span>
                  </p>
                </div>

                <div *ngIf="item.suggestions?.length" class="mb-2">
                  <p class="text-sm text-[#778da9ff]">Suggestions:</p>
                  <ul class="list-disc list-inside text-[#e0e1ddff]">
                    <li *ngFor="let suggestion of item.suggestions">
                      {{ suggestion }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div
          *ngIf="errorMessage"
          class="bg-red-900 text-red-100 p-4 rounded-md mt-4"
        >
          {{ errorMessage }}
        </div>
      </div>
    </div>
  `,
})
export class ChatNutritionComponent {
  nutritionForm: FormGroup;
  submitted = false;
  isLoading = false;
  report: NutritionReport | null = null;
  errorMessage = "";
  selectedHealthConditions: string[] = [];

  healthConditionsList = [
    "Diabetes",
    "Hypertension",
    "High Cholesterol",
    "Obesity",
    "Heart Disease",
    "Kidney Disease",
    "Celiac Disease",
    "Lactose Intolerance",
  ];

  constructor(
    private fb: FormBuilder,
    private nutritionService: NutritionService
  ) {
    this.nutritionForm = this.fb.group({
      text: ["", Validators.required],
      weightKg: [
        "",
        [Validators.required, Validators.min(20), Validators.max(300)],
      ],
      heightCm: [
        "",
        [Validators.required, Validators.min(100), Validators.max(250)],
      ],
      age: ["", [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: ["", Validators.required],
    });
  }

  get f() {
    return this.nutritionForm.controls;
  }

  onHealthConditionChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const condition = checkbox.value;

    if (checkbox.checked) {
      this.selectedHealthConditions.push(condition);
    } else {
      this.selectedHealthConditions = this.selectedHealthConditions.filter(
        (c) => c !== condition
      );
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = "";

    if (this.nutritionForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.report = null;

    const request = {
      ...this.nutritionForm.value,
      healthConditions: this.selectedHealthConditions || [],
    };

    this.nutritionService.generateNutritionReport(request).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.report = response;
        // Scroll to results
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          "Failed to analyze nutrition data. Please try again later.";
        console.error("API error:", error);
      },
    });
  }
}
