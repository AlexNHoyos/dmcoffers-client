import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private userId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setUserId(id: string): void {
    this.userId.next(id);
  }

  getUserId(): Observable<string> {
    return this.userId.asObservable();
  }

  getUser(id: string): Observable<User> {
    return this.http
      .get<User>(environment.urlApi + 'users/' + id)
      .pipe(catchError(this.handleError));
  }

  updateUser(id: string, userRequest: User): Observable<any> {
    return this.http
      .put<User>(environment.urlApi + 'users/' + id, userRequest)
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
