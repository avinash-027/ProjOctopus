import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-[#0d1b2aff] border-b border-[#415a77ff] py-4 px-6">
      <div class="container mx-auto flex flex-wrap items-center justify-between">
        <div class="flex items-center">
          <a routerLink="/" class="text-xl font-bold text-[#e0e1ddff]">NutrientTracker</a>
        </div>
        
        <div class="flex items-center space-x-1 md:space-x-4">
          <a routerLink="/chat-nutrition" routerLinkActive="active" class="nav-link">Nutrition Analysis</a>
          <a routerLink="/chat-with-nutrition-ai" routerLinkActive="active" class="nav-link">Nutrition AI Chat</a>
          <a routerLink="/photo-analysis" routerLinkActive="active" class="nav-link">Photo Analysis</a>
          <a routerLink="/meal-planner" routerLinkActive="active" class="nav-link">Meal Planner</a>
          <button (click)="logout()" class="btn btn-outline ml-4">Logout</button>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}