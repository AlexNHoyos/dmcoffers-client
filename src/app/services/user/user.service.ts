import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserPage } from '../../models/user.model';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/components/crud/crud.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudService<UserPage> {
  override endpoint = `${environment.urlApi}users`;
  constructor(protected override http: HttpClient) {
    super(http);
  }

  private userId: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  setUserId(id: number): void {
    this.userId.next(id);
  }

  getUserId(): Observable<number> {
    return this.userId.asObservable();
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(environment.urlApi + 'users/' + id)
      .pipe(catchError(this.handleError));
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.endpoint}/findall`);
  }

  updateUser(id: number, userRequest: User): Observable<any> {
    return this.http
      .put<User>(`${this.endpoint}/updateUser/${id}`, userRequest)
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
