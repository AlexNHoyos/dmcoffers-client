import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/models/user.js';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.js';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.urlApi;

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(this.apiUrl + 'users/' + id)
      .pipe(catchError(this.handleError));
  }

  updateUser(id: number, userRequest: User): Observable<any> {
    return this.http
      .put<User>(this.apiUrl + 'users/' + id, userRequest)
      .pipe(catchError(this.handleError));
  }

  createUser(userRequest: User): Observable<any> {
    return this.http
      .post<User>(this.apiUrl, userRequest)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error(
        'Backend retorno el codigo de estado ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo fallo. Por favor intente nuevamente.')
    );
  }
}
