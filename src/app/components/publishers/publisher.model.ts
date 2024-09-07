import { Page } from 'src/app/models/pagination.js';

export class Publisher {
  id: string = '';
  publishername: string = '';
  foundation_date: Date | null = null;
  dissolution_date?: Date | string;
  status: string = '';
  creationtimestamp: string = '';
  creationuser: string = '';
  modificationtimestamp?: Date | string;
  modificationuser?: string;
}

export interface PublisherPage extends Page<Publisher> {
  content: Publisher[];
}
