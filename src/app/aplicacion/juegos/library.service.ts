import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { environment } from 'src/environments/environment';
import { Juego } from './juegos.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
private apiUrl = `${environment.urlApi}juegos`;
  token = this.loginService.userToken;
  constructor(private http: HttpClient, private loginService: LoginService) {}

  // Agregar un juego a la biblioteca
  addToLibrary(juegoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/biblioteca/${juegoId}`, null, {
      headers: { Authorization: `Bearer ${this.token}` }, // Incluir el token en la cabecera
    });
  }

  // Quitar un juego de la biblioteca
  removeFromLibrary(juegoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/biblioteca/${juegoId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  // Método para verificar si un juego está en la biblioteca
  isInLibrary(juegoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/biblioteca/${juegoId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  // Obtener todos los juegos de la biblioteca de un usuario
  getLibrary(): Observable<any[]> {
    return this.http.get<Juego[]>(`${this.apiUrl}/biblioteca`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}
