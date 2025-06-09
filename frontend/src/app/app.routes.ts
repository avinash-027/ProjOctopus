import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'chat-nutrition',
    loadComponent: () => import('./pages/chat-nutrition/chat-nutrition.component').then(m => m.ChatNutritionComponent),
    canActivate: [authGuard]
  },
    {
    path: 'chat-with-nutrition-ai',
    loadComponent: () => import('./pages/app-chat-with-nutrition-ai/app-chat-with-nutrition-ai').then(m => m.ChatWithNutritionAiComponent),
    canActivate: [authGuard]
  },
  {
    path: 'photo-analysis',
    loadComponent: () => import('./pages/photo-analysis/photo-analysis.component').then(m => m.PhotoAnalysisComponent),
    canActivate: [authGuard]
  },
  {
    path: 'meal-planner',
    loadComponent: () => import('./pages/meal-planner/meal-planner.component').then(m => m.MealPlannerComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];