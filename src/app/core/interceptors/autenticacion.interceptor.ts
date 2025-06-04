import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const autenticacionInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('jwt');
  const router = inject(Router);

  // Clonar y añadir el token si existe
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error en la petición HTTP:', error.message);

      
      if (
        error.status === 400 ||
        error.message?.includes('Token inválido') ||
        error.message?.includes('revocado')
      ) {
        console.warn('Token expirado o inválido. Redirigiendo al login...');
        sessionStorage.removeItem('jwt');
        router.navigate(['/login']); // Redirige según tu ruta de login
      }

      return throwError(() => error);
    })
  );
};
