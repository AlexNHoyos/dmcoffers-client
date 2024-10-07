import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CrudService } from 'src/app/components/crud/crud.service';
import { environment } from 'src/environments/environment';
import { Hosting, HostingPage } from '../../aplicacion/hosting/hosting.model';

@Injectable({
  providedIn: 'root',
})
export class HostingService extends CrudService<HostingPage> {
  override endpoint = `${environment.urlApi}hostings`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  createHosting(hosting: Hosting): Observable<Hosting> {
    return this.http.post<Hosting>(`${this.endpoint}/create`, hosting);
  }

  updateHosting(id: number, hosting: Hosting): Observable<Hosting> {
    return this.http.put<Hosting>(`${this.endpoint}/${id}`, hosting);
  }

  getAllHostings(): Observable<Hosting[]> {
    return this.http.get<Hosting[]>(`${this.endpoint}/findall`);
  }

  getHosting(id: number): Observable<Hosting> {
    return this.http.get<Hosting>(`${this.endpoint}/${id}`);
  }
}
