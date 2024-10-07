import { Page } from 'src/app/models/pagination.js';

export class Categoria {
  id: number = 0;
  description: string = '';
  creationtimestamp: string | null = null;
  creationuser: string = '';
  modificationtimestamp?: string | null = null;
  modificationuser?: string | null = null;
}

export interface CategoriaPage extends Page<Categoria> {
  content: Categoria[];
}
