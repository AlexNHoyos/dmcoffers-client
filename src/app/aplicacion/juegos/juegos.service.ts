import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CrudService } from 'src/app/components/crud/crud.service';
import { environment } from 'src/environments/environment';
import { Juego, JuegoPage } from '../../aplicacion/juegos/juegos.model';

@Injectable({
  providedIn: 'root',
})
export class JuegoService extends CrudService<JuegoPage> {
  override endpoint = `${environment.urlApi}juegos`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  createJuego(juego: Juego): Observable<Juego> {
    return this.http.post<Juego>(`${this.endpoint}/`, juego);
  }

  updateJuego(id: number, juego: Juego): Observable<Juego> {
    console.log(id, juego);
    return this.http.patch<Juego>(`${this.endpoint}/${id}`, juego);
  }

  getJuegos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.endpoint);
  }

  getJuego(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.endpoint}/${id}`);
  }

  searchJuegosByName(gamename: string): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.endpoint}/search`, {
      params: { gamename },
    });
  }
}
