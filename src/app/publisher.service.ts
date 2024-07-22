import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Publisher {
  //Campos del modelo
  id: string;
  publishername: string;
  foundation_date: Date;
  dissolution_date: Date;
  status: boolean;
  creationtimestamp: Date;
  creationuser: string;
  modificationtimestamp: Date;
  modificationuser: string;
}

@Injectable({
  providedIn: 'root',
})
export class PublisherService {
  private apiUrl = 'http://localhost:3000/api/publishers';

  constructor(private http: HttpClient) {}

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.apiUrl);
  }
}
