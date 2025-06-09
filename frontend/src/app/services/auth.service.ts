import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';

interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  private authStateSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public authState$ = this.authStateSubject.asObservable();
  
  // Signal for reactive UI updates
  public isLoggedIn = signal(this.hasValidToken());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    if (this.hasValidToken()) {
      this.authStateSubject.next(true);
      this.isLoggedIn.set(true);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>('http://localhost:5247/api/Auth/login', { username, password })
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        map(() => true),
        catchError(error => {
          console.error('Login failed', error);
          return throwError(() => new Error(error.error?.message || 'Login failed. Please try again.'));
        })
      );
  }

  refreshToken(): Observable<boolean> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>('http://localhost:5247/api/Auth/login', { refreshToken })
      .pipe(
        tap(response => this.handleAuthResponse(response)),
        map(() => true),
        catchError(error => {
          console.error('Token refresh failed', error);
          this.logout();
          return throwError(() => new Error('Session expired. Please login again.'));
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    
    this.authStateSubject.next(false);
    this.isLoggedIn.set(false);
    
    this.router.navigate(['']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.hasValidToken();
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }

  private handleAuthResponse(response: AuthResponse): void {
    if (response.accessToken) {
      localStorage.setItem(this.TOKEN_KEY, response.accessToken);
      
      if (response.refreshToken) {
        localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
      }
      
      this.authStateSubject.next(true);
      this.isLoggedIn.set(true);
    }
  }
}
