import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const autenticacionInterceptor: HttpInterceptorFn = (req, next) => {

  const Service = inject(AuthService)
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

        let bodySession = {
          username: sessionStorage.getItem("username") || "",
          password: sessionStorage.getItem("password") || ""
        }
        Service.authGetToken(bodySession).subscribe({
          next: (resp) => {
            sessionStorage.setItem("jwt", resp.data.token)
          }
        })

        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
