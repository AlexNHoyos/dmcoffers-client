import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserPage } from '../../models/user.model';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
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

  private userId: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  setUserId(id: number | null): void {
    console.log('📌 setUserId llamado con:', id);
    this.userId.next(id);
  }

  getUserId(): Observable<number | null> {
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

  updateUser(id: number, userRequest: any): Observable<any> {
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

  getAllUserRoles(idUser: number): Observable<number[]> {
    return this.http
      .get<number[]>(`${this.endpoint}/getUserRolsByIdUser/${idUser}`);
  }

}
