import { Page } from 'src/app/models/pagination.js';

export class SupportTicket {
  id: string = '';
  status: boolean = false;
  creationuser: string = '';
  creationtimestamp: string | null = null;
  modificationuser?: string;
  modificationtimestamp?: string | null = null;
}

export interface SupportTicketPage extends Page<SupportTicket> {
  content: SupportTicket[];
}
