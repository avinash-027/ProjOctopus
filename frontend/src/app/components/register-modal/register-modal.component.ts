import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" (click)="onOverlayClick($event)">
      <div class="modal-content slide-in-up">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-[#e0e1ddff]">Create Account</h2>
          <button class="text-[#778da9ff] hover:text-[#e0e1ddff]" (click)="close()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="bg-[#1b263bff] rounded-md p-4 mb-6 border border-[#415a77ff]">
          <p class="text-[#778da9ff] text-sm">
            <strong>Note:</strong> This is a placeholder for registration functionality. 
            Please use the login option with existing credentials.
          </p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <input 
              type="text" 
              id="username" 
              formControlName="username" 
              class="input-field"
              [class.border-red-500]="submitted && registerForm.get('username')?.errors"
            >
            <div *ngIf="submitted && registerForm.get('username')?.errors" class="form-error">
              Username is required
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              class="input-field"
              [class.border-red-500]="submitted && registerForm.get('email')?.errors"
            >
            <div *ngIf="submitted && registerForm.get('email')?.errors" class="form-error">
              <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="registerForm.get('email')?.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              class="input-field"
              [class.border-red-500]="submitted && registerForm.get('password')?.errors"
            >
            <div *ngIf="submitted && registerForm.get('password')?.errors" class="form-error">
              <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required</span>
              <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Password must be at least 6 characters</span>
            </div>
          </div>

          <div class="flex flex-col space-y-3 mt-6">
            <button 
              type="submit" 
              class="btn btn-secondary"
              disabled
            >
              Register (Placeholder)
            </button>
            <button 
              type="button" 
              class="btn btn-primary"
              (click)="switchToLogin()"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() switchMode = new EventEmitter<string>();
  
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    
    // This is a placeholder - registration functionality is not implemented
    console.log('Registration form submitted', this.registerForm.value);
  }

  switchToLogin(): void {
    this.switchMode.emit('login');
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