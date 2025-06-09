import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" (click)="onOverlayClick($event)">
      <div class="modal-content slide-in-up">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-[#e0e1ddff]">Login to NutrientTracker</h2>
          <button class="text-[#778da9ff] hover:text-[#e0e1ddff]" (click)="close()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <input 
              type="text" 
              placeholder="abc@abc" 
              id="username" 
              formControlName="username" 
              class="input-field"
              [class.border-red-500]="submitted && loginForm.get('username')?.errors"
            >
            <div *ngIf="submitted && loginForm.get('username')?.errors" class="form-error">
              Username is required
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input 
              type="password" 
              placeholder="123123" 
              id="password" 
              formControlName="password" 
              class="input-field"
              [class.border-red-500]="submitted && loginForm.get('password')?.errors"
            >
            <div *ngIf="submitted && loginForm.get('password')?.errors" class="form-error">
              Password is required
            </div>
          </div>

          <div *ngIf="errorMessage" class="text-red-500 text-sm mt-2">
            {{ errorMessage }}
          </div>

          <div class="flex flex-col space-y-3 mt-6">
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="isLoading"
            >
              <span *ngIf="isLoading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
            <button 
              type="button" 
              class="btn btn-secondary"
              (click)="switchToRegister()"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() switchMode = new EventEmitter<string>();
  
  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    
    const { username, password } = this.loginForm.value;
    
    this.authService.login(username, password).subscribe({
      next: () => {
        this.isLoading = false;
        this.close();
        this.router.navigate(['/chat-nutrition']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Login failed. Please try again.';
      }
    });
  }

  switchToRegister(): void {
    this.switchMode.emit('register');
  }

  close(): void {
    this.closeModal.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}