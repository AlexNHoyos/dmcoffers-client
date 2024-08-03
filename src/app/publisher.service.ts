import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Publisher } from './models/publisher.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  private apiUrl = 'http://localhost:3000/api/publishers';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.apiUrl);
  }

  getPublisher(id: string): Observable<Publisher> {
    return this.http
      .get<Publisher>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.errorHandler.handleError));
  }

  createPublisher(publisher: Publisher): Observable<Publisher> {
    return this.http
      .post<Publisher>(this.apiUrl, publisher)
      .pipe(catchError(this.errorHandler.handleError));
  }
}
