import { Page } from 'src/app/models/pagination.js';

export class Publisher {
  id: string = '';
  publishername: string = '';
  foundation_date: string | null = null;
  dissolution_date?: string | null;
  status: string = '';
  creationtimestamp: string | null = null;
  creationuser: string = '';
  modificationtimestamp?: string | null = null;
  modificationuser?: string;
}

export interface PublisherPage extends Page<Publisher> {
  content: Publisher[];
}
