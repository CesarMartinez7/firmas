import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const autenticacionInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('jwt');

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error en la petición HTTP:', error.message);
      if(error.message === "Token inválido o revocado" ){
        console.log("Es la peticion")
      }
      return throwError(() => error);
    })
  );
};
