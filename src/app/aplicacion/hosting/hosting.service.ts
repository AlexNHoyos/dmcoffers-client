import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hosting } from '../../aplicacion/hosting/hosting.model';

@Injectable({
  providedIn: 'root',
})
export class HostingService {
  private endpoint = `${environment.urlApi}hostings`;

  constructor(private http: HttpClient) {
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

  deleteHosting(id: number): Observable<Hosting> {
    return this.http.delete<Hosting>(`${this.endpoint}/${id}`);
  }
}
