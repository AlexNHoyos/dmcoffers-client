import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hosting, HostingPublisher } from '../../aplicacion/hosting/hosting.model';

@Injectable({
  providedIn: 'root',
})
export class HostingService {
  private endpoint = `${environment.urlApi}hostings`;
  private endpointHostingPublisher = `${environment.urlApi}hostingPublisher`;

  constructor(private http: HttpClient) {
  }

  createHosting(hosting: Hosting): Observable<Hosting> {
    return this.http.post<Hosting>(`${this.endpoint}/create`, hosting);
  }

  createHostingPublisher(hostingPublisher: HostingPublisher): Observable<HostingPublisher> {
    return this.http.post<HostingPublisher>(`${this.endpointHostingPublisher}/create`, hostingPublisher);
  }

  updateHosting(id: number, hosting: Hosting): Observable<Hosting> {
    return this.http.put<Hosting>(`${this.endpoint}/${id}`, hosting);
  }

  updateHostingPublisher(id: number, hostingpublisher: HostingPublisher): Observable<HostingPublisher> {
    return this.http.put<HostingPublisher>(`${this.endpointHostingPublisher}/${id}`, hostingpublisher);
  }

  getAllHostings(): Observable<Hosting[]> {
    return this.http.get<Hosting[]>(`${this.endpoint}/findall`);
  }

  getAllHostingPublishers(): Observable<HostingPublisher[]> {
    return this.http.get<HostingPublisher[]>(`${this.endpointHostingPublisher}/findall`);
  }

  getHosting(id: number): Observable<Hosting> {
    return this.http.get<Hosting>(`${this.endpoint}/${id}`);
  }

  getHostingPublisher(id: number): Observable<HostingPublisher> {
    return this.http.get<HostingPublisher>(`${this.endpointHostingPublisher}/${id}`);
  }

  deleteHosting(id: number): Observable<Hosting> {
    return this.http.delete<Hosting>(`${this.endpoint}/${id}`);
  }

}
