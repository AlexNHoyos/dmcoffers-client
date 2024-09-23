import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SupportTicket } from '../support-ticket.model';

@Component({
  selector: 'app-support-ticket-detail',
  templateUrl: './support-ticket-detail.component.html',
  styleUrls: ['./support-ticket-detail.component.scss'],
})
export class SupportTicketDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<SupportTicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { supportTicket: SupportTicket }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
