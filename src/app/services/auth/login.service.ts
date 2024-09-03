import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/loginRequest.js';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  tap,
  catchError,
  Observable,
  throwError,
  BehaviorSubject,
  map,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(
      sessionStorage.getItem('accessToken') != null
    );
    this.currentUserData = new BehaviorSubject<String>(
      sessionStorage.getItem('accessToken') || ''
    );

    // Si hay un token, actualizar el userId en environment
    if (sessionStorage.getItem('accessToken')) {
      const token = sessionStorage.getItem('accessToken');
      this.updateUserId(token);
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http
      .post<any>(environment.urlHost + 'auth/login', credentials)
      .pipe(
        tap((userData) => {
          sessionStorage.setItem('accessToken', userData.accessToken);
          this.currentUserData.next(userData.accessToken);
          this.currentUserLoginOn.next(true);

          this.updateUserId(userData.accessToken);
        }),
        map((userData) => userData.accessToken),
        catchError(this.handleError)
      );
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
    this.currentUserLoginOn.next(false);

    environment.userId = '';
  }

  private updateUserId(token: string | null) {
    if (token) {
      const decodedToken: any = jwtDecode(token);
      environment.userId = decodedToken.id || ''; // Asegúrate que el JWT tenga el userId
      console.log('id ' + decodedToken.id);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error('Backend retorno el codigo de estado ', error);
    }
    return throwError(
      () => new Error('Algo fallo. Por favor intente nuevamente.')
    );
  }

  get userData(): Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value;
  }
}
