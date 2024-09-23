import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CrudService } from 'src/app/components/crud/crud.service';
import { environment } from 'src/environments/environment';
import { Desarrollador, DesarrolladorPage } from './desarrolladores.models.js';

@Injectable({
  providedIn: 'root',
})
export class DesarrolladoresService extends CrudService<DesarrolladorPage> {
  override endpoint = `${environment.urlApi}developers`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  createDesarrollador(desarrollador: Desarrollador): Observable<Desarrollador> {
    return this.http.post<Desarrollador>(`${this.endpoint}/`, desarrollador);
  }

  updateDesarrollador(
    id: string,
    desarrollador: Desarrollador
  ): Observable<Desarrollador> {
    return this.http.put<Desarrollador>(
      `${this.endpoint}/${id}`,
      desarrollador
    );
  }

  getAllDesarrolladores(): Observable<Desarrollador[]> {
    return this.http.get<Desarrollador[]>(this.endpoint);
  }

  getDesarrollador(id: string): Observable<Desarrollador> {
    return this.http.get<Desarrollador>(`${this.endpoint}/${id}`);
  }
}
