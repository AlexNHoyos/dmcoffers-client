import { Page } from 'src/app/models/pagination.js';
import { Publisher } from '../publishers/publisher.model';
import { Desarrollador } from '../desarrolladores/desarrolladores.models';
import { Categoria } from '../categorias/categoria.model';
import { Precio } from '../precios/precio.model';

export class Juego {
  id: number = 0;
  gamename: string = '';
  release_date: Date = new Date();
  publishment_date: Date = new Date();
  creationtimestamp: Date = new Date();
  creationuser: string = '';
  modificationtimestamp?: Date | null;
  modificationuser?: string | null;
  publisherName: string = '';
  developerName: string = '';
  categoriasNames: string[] = [];
  price?: number;
}

export interface JuegoPage extends Page<Juego> {
  content: Juego[];
}
