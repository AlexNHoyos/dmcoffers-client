import { Page } from 'src/app/models/pagination.js';
import { Publisher } from '../publishers/publisher.model';
import { Desarrollador } from '../desarrolladores/desarrolladores.models';
import { Categoria } from '../categorias/categoria.model';
import { Precio } from '../precios/precio.model';

export class Juego {
  id: number = 0;
  gamename: string = '';
  release_date: string | null = null;
  publishment_date: string | null = null;
  creationtimestamp: string | null = null;
  creationuser: string = '';
  modificationtimestamp?: string | null = null;
  modificationuser?: string | null;
  publisherName: string = '';
  developerName: string = '';
  categoriasNames: string[] = [];
  price?: number;
  isInWishlist?: boolean;
  isInLibrary?: boolean;
}

export interface JuegoPage extends Page<Juego> {
  content: Juego[];
}
