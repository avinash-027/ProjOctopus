import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Skip adding token for auth requests
  if (req.url.includes('/api/Auth/')) {
    return next(req);
  }

  // Clone the request and add the auth token
  const authToken = authService.getToken();
  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    return next(authReq).pipe(
      catchError(error => {
        // If we get a 401 error, the token might be expired
        if (error.status === 401) {
          return authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = authService.getToken();
              const retryReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${newToken}`)
              });
              return next(retryReq);
            }),
            catchError(refreshError => {
              // If refresh fails, log the user out
              authService.logout();
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};