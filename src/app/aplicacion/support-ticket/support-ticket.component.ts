import { Component } from '@angular/core';
import { SupportTicket } from './support-ticket.model';
import { SupportTicketService } from './support-ticket.service';
import { MatDialog } from '@angular/material/dialog';
import { SupportTicketUpdateComponent } from './support-ticket-update/support-ticket-update.component';
import { SupportTicketCreateComponent } from './support-ticket-create/support-ticket-create.component';
import { SupportTicketDetailComponent } from './support-ticket-detail/support-ticket-detail.component';
import { SupportTicketDeleteComponent } from './support-ticket-delete/support-ticket-delete.component';

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.scss'],
  standalone: false
})
export class SupportTicketComponent {
  supportTickets: SupportTicket[] = [];

  constructor(
    private supportTicketService: SupportTicketService,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['id', 'user', 'actions'];

  ngOnInit(): void {
    this.loadSupportTickets();
  }

  getCreateComponent() {
    return SupportTicketCreateComponent;
  }
  getEditComponent() {
    return SupportTicketUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(SupportTicketCreateComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadSupportTickets(); // Carga o actualiza la lista de SupportTickets
      }
    });
  }

  showDetails(id: number): void {
    this.supportTicketService
      .getSupportTicket(id)
      .subscribe((supportTicket) => {
        const dialogRef = this.dialog.open(SupportTicketDetailComponent, {
          width: '400px',
          disableClose: true,
          data: { supportTicket },
        });
      });
  }

  openEditDialog(id: number): void {
    this.supportTicketService
      .getSupportTicket(id)
      .subscribe((supportTicket) => {
        const dialogRef = this.dialog.open(SupportTicketUpdateComponent, {
          width: '400px',
          disableClose: true,
          data: { supportTicket },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.loadSupportTickets(); // Carga o actualiza la lista de SupportTickets
          }
        });
      });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(SupportTicketDeleteComponent, {
      width: '400px',
      disableClose: true,
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadSupportTickets(); // Carga o actualiza la lista de SupportTickets
      }
    });
  }

  loadSupportTickets(): void {
    this.supportTicketService.getAllSupportTickets().subscribe((data) => {
      this.supportTickets = data;
    });
  }
}
