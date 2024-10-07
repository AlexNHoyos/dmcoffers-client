import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CrudService } from 'src/app/components/crud/crud.service';
import { environment } from 'src/environments/environment';
import {
  Publisher,
  PublisherPage,
} from '../../aplicacion/publishers/publisher.model';

@Injectable({
  providedIn: 'root',
})
export class PublisherService extends CrudService<PublisherPage> {
  override endpoint = `${environment.urlApi}publishers`;

  constructor(protected override http: HttpClient) {
    super(http);
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
}
