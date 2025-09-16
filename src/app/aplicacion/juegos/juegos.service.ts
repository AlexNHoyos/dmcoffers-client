import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Juego } from '../../aplicacion/juegos/juegos.model';

@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  private endpoint = `${environment.urlApi}juegos`;

  constructor(private http: HttpClient) {}

  createJuego(juego: FormData): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/`, juego);
  }

  updateJuego(id: number, juegoData: FormData): Observable<any> {
    return this.http.patch<Juego>(`${this.endpoint}/${id}`, juegoData);
  }

  getJuegos(): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.endpoint);
  }

  getJuego(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.endpoint}/${id}`);
  }

  deleteJuego(id: number): Observable<Juego> {
    return this.http.delete<Juego>(`${this.endpoint}/${id}`);
  }

  searchJuegosByName(gamename: string): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.endpoint}/search`, {
      params: { gamename },
    });
  }
}
