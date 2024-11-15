import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CrudService } from 'src/app/components/crud/crud.service';
import { environment } from 'src/environments/environment';
import {
  SupportTicket,
  SupportTicketPage,
} from '../../aplicacion/support-ticket/support-ticket.model';
import { LoginService } from 'src/app/services/auth/login.service';

@Injectable({
  providedIn: 'root',
})
export class SupportTicketService extends CrudService<SupportTicketPage> {
  override endpoint = `${environment.urlApi}supportTicket`;

  constructor(protected override http: HttpClient) {
    super(http);
  }

  createSupportTicket(
    supportTicket: SupportTicket,
    username: string
  ): Observable<SupportTicket> {
    return this.http.post<SupportTicket>(
      `${this.endpoint}/createTicket/${username}`,
      supportTicket
    );
  }

  updateSupportTicket(
    id: number,
    supportTicket: SupportTicket
  ): Observable<SupportTicket> {
    return this.http.put<SupportTicket>(
      `${this.endpoint}/${id}`,
      supportTicket
    );
  }

  getAllSupportTickets(): Observable<SupportTicket[]> {
    return this.http.get<SupportTicket[]>(`${this.endpoint}/findall`);
  }

  getSupportTicket(id: number): Observable<SupportTicket> {
    return this.http.get<SupportTicket>(`${this.endpoint}/${id}`);
  }
}
