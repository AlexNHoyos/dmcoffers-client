import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http/index.js';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: String = this.loginService.userToken;

    if (token) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Si el token ha expirado o el usuario no está autorizado, redirige al inicio
          this.router.navigate(['/inicio']);
          this.loginService.logout(); // Limpia el token y cualquier sesión del usuario si tienes un método de logout
        }
        return throwError(error); // Lanza el error para que otros manejadores también puedan procesarlo
      })
    );
  }
}
