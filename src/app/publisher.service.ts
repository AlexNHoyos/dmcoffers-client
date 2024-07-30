import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Publisher } from './models/publisher.model';

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  private apiUrl = 'http://localhost:3000/api/publishers';

  constructor(private http: HttpClient) {}

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.apiUrl);
  }

  getPublisher(id: string): Observable<Publisher> {
    return this.http
      .get<Publisher>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Separar en otro archivo!"!!!!"
  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Error desconocido!';

    if (error.status === 400) {
      // Errores de cliente, como formato de ID inválido
      errorMsg = 'Formato invalido.';
    } else if (error.status === 404) {
      // El ID no existe en la base de datos
      errorMsg = 'Publisher no encontrado.';
    } else if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMsg = `Ha ocurrido un error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMsg = `Error de servidor: ${error.message}`;
    }
    return throwError(errorMsg);
  }

  createPublisher(publisher: Publisher): Observable<Publisher> {
    return this.http.post<Publisher>(`${this.apiUrl}`, publisher);
  }
}
