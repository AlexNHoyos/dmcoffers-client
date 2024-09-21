import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../user/user.service';
import { ErrorHandlerService } from '../error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserLoginOnSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private currentUserDataSubject: BehaviorSubject<String> =
    new BehaviorSubject<String>('');

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private errorHandler: ErrorHandlerService
  ) {
    const token = sessionStorage.getItem('accessToken');
    this.currentUserLoginOnSubject.next(!!token);
    this.currentUserDataSubject.next(token || '');

    if (token) {
      this.updateUserId(token);
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http
      .post<any>(`${environment.urlHost}auth/login`, credentials)
      .pipe(
        tap((userData) => {
          sessionStorage.setItem('accessToken', userData.accessToken);
          this.currentUserDataSubject.next(userData.accessToken);
          this.currentUserLoginOnSubject.next(true);
          this.updateUserId(userData.accessToken);
        }),
        map((userData) => userData.accessToken),
        catchError((error: HttpErrorResponse) =>
          this.errorHandler.handleError(error)
        )
      );
  }

  logout(): void {
    sessionStorage.removeItem('accessToken');
    this.currentUserLoginOnSubject.next(false);
    this.currentUserDataSubject.next('');
    this.userService.setUserId('');
  }

  private updateUserId(token: string | null) {
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userService.setUserId(decodedToken.id || '');
    }
  }

  get userData(): Observable<String> {
    return this.currentUserDataSubject.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOnSubject.asObservable();
  }

  get userToken(): String {
    return this.currentUserDataSubject.value;
  }
}
