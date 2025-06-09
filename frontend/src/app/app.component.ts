import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
    <app-navbar *ngIf="authService.isAuthenticated()"></app-navbar>
    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  constructor(public authService: AuthService) {}
}