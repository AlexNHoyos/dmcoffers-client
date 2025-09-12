import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { environment } from 'src/environments/environment';
import { Juego } from './juegos.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = `${environment.urlApi}juegos`;
  token = this.loginService.userToken;
  constructor(private http: HttpClient, private loginService: LoginService) {}

  // Agregar un juego a la wishlist
  addToWishlist(juegoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist/${juegoId}`, null);
  }

  // Quitar un juego de la wishlist
  removeFromWishlist(juegoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/wishlist/${juegoId}`);
  }

  // Método para verificar si un juego está en la wishlist
  isInWishlist(juegoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/wishlist/${juegoId}`);
  }

  // Obtener todos los juegos de la wishlist de un usuario
  getWishlist(): Observable<any[]> {
    return this.http.get<Juego[]>(`${this.apiUrl}/wishlist`);
  }
}
