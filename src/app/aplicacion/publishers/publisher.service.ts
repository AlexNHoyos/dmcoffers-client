import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Publisher } from '../../aplicacion/publishers/publisher.model';

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  private endpoint = `${environment.urlApi}publishers`;

  constructor(private http: HttpClient) {
  }

  createPublisher(publisher: Publisher): Observable<Publisher> {
    return this.http.post<Publisher>(`${this.endpoint}/create`, publisher);
  }

  updatePublisher(id: number, publisher: Publisher): Observable<Publisher> {
    return this.http.put<Publisher>(`${this.endpoint}/${id}`, publisher);
  }

  getAllPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.endpoint);
  }

  getPublisher(id: number): Observable<Publisher> {
    return this.http.get<Publisher>(`${this.endpoint}/${id}`);
  }

  deletePublisher(id: number): Observable<any> {
    return this.http.delete<Publisher>(`${this.endpoint}/${id}`);
  }
}
