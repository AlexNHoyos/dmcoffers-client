import { Page } from 'src/app/models/pagination.js';

export class Categoria {
  id: string = '';
  descripcion: string = '';
  creationtimestamp: string | null = null;
  creationuser: string = '';
  modificationtimestamp?: string | null = null;
  modificationuser?: string;
}

export interface CategoriaPage extends Page<Categoria> {
  content: Categoria[];
}
