import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { environment } from 'src/environments/environment';
import { Juego } from './juegos.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.urlApi}juegos`;
  token = this.loginService.userToken;

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  // Agregar un juego al carrito
  addToCart(juegoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/${juegoId}`, null);
  }

  // Quitar un juego del carrito
  removeFromCart(juegoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cart/${juegoId}`);
  }

  // Verificar si un juego está en el carrito
  isInCart(juegoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart/${juegoId}`);
  }

  // Obtener todos los juegos en el carrito
  getCart(): Observable<Juego[]> {
    return this.http.get<Juego[]>(`${this.apiUrl}/cart`);
  }
  
  public async getCartTotal(): Promise<number> {
  const juegos = await firstValueFrom(this.getCart());
  return juegos.reduce((total, juego) => total + juego.price!, 0);
  }

  checkout(): Observable<any> {
  return this.http.post(`${this.apiUrl}/cart/checkout`, null);
  }


}