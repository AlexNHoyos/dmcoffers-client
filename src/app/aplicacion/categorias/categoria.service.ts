import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CrudService } from 'src/app/components/crud/crud.service';
import { environment } from 'src/environments/environment';
import {
  Categoria,
  CategoriaPage,
} from '../../aplicacion/categorias/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService extends CrudService<CategoriaPage> {
  override endpoint = `${environment.urlApi}categories`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.endpoint}/create`, categoria);
  }

  updateCategoria(id: string, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.endpoint}/${id}`, categoria);
  }

  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.endpoint);
  }

  getCategoria(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.endpoint}/${id}`);
  }
}
