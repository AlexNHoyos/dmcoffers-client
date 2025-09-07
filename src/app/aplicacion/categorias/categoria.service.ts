import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Categoria} from '../../aplicacion/categorias/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private endpoint = `${environment.urlApi}categories`;

  constructor(private http: HttpClient) {
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.endpoint}/create`, categoria);
  }

  updateCategoria(id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.endpoint}/${id}`, categoria);
  }

  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.endpoint);
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.endpoint}/${id}`);
  }

  deleteCategoria(id: number): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.endpoint}/${id}`);
  }
}
