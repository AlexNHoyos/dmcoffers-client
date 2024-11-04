import { Page } from 'src/app/models/pagination.js';

export class Publisher {
  id: number = 0;
  publishername: string = '';
  foundation_date: string | null = null;
  dissolution_date?: string | null;
  status: Boolean = true;
  creationtimestamp: string | null = null;
  creationuser: string = '';
  modificationtimestamp?: string | null = null;
  modificationuser?: string | null = null;
}

export interface PublisherPage extends Page<Publisher> {
  content: Publisher[];
}
