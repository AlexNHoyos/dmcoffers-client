import { Page } from 'src/app/models/pagination.js';

export class Hosting {
  id: number = 0;
  name: string = '';
  creationuser: string = '';
  creationtimestamp: string | null = null;
  modificationuser?: string;
  modificationtimestamp?: string | null = null;
  status: boolean = false;
}

export interface HostingPage extends Page<Hosting> {
  content: Hosting[];
}
