import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Desarrollador} from './desarrolladores.models';

@Injectable({
  providedIn: 'root',
})
export class DesarrolladoresService {
  private endpoint = `${environment.urlApi}developers`;

  constructor(private http: HttpClient) {
  }

  createDesarrollador(desarrollador: Desarrollador): Observable<Desarrollador> {
    return this.http.post<Desarrollador>(`${this.endpoint}/`, desarrollador);
  }

  updateDesarrollador(id: number, desarrollador: Desarrollador): Observable<Desarrollador> {
    return this.http.put<Desarrollador>(`${this.endpoint}/${id}`,desarrollador);
  }

  getAllDesarrolladores(): Observable<Desarrollador[]> {
    return this.http.get<Desarrollador[]>(this.endpoint);
  }

  getDesarrollador(id: number): Observable<Desarrollador> {
    return this.http.get<Desarrollador>(`${this.endpoint}/${id}`);
  }

  deleteDesarrollador(id: number): Observable<Desarrollador> {
    return this.http.delete<Desarrollador>(`${this.endpoint}/${id}`);
  }
}
