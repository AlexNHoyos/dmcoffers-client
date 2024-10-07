import { Page } from 'src/app/models/pagination.js';

export class Desarrollador {
  id: number = 0;
  developername: string = '';
  foundation_date: string | null = null;
  dissolution_date?: string | null;
  status: string = '';
  creationtimestamp: string | null = null;
  creationuser: string = '';
  modificationtimestamp?: string | null = null;
  modificationuser?: string | null = null;
}

export interface DesarrolladorPage extends Page<Desarrollador> {
  content: Desarrollador[];
}
