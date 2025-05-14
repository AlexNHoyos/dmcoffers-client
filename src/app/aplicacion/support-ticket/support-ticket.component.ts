import { Component } from '@angular/core';
import { SupportTicket } from './support-ticket.model';
import { SupportTicketService } from './support-ticket.service';
import { CrudComponent } from '../../components/crud/crud.component';
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
export class SupportTicketComponent extends CrudComponent<SupportTicket> {
  supportTickets: SupportTicket[] = [];

  constructor(
    private supportTicketService: SupportTicketService,
    override dialog: MatDialog
  ) {
    super(supportTicketService, dialog);
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
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('SupportTicket creado');
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
          data: { supportTicket },
        });
        /*  No es necesario porque no edito los datos adentro del dialog, pero podria implementarse a futuro
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadSupportTickets(); // Carga o actualiza la lista de SupportTickets
        }
      });*/
      });
  }

  openEditDialog(id: number): void {
    this.supportTicketService
      .getSupportTicket(id)
      .subscribe((supportTicket) => {
        const dialogRef = this.dialog.open(SupportTicketUpdateComponent, {
          width: '400px',
          data: { supportTicket },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            console.log('SupportTicket actualizado');
            this.loadSupportTickets(); // Carga o actualiza la lista de SupportTickets
          }
        });
      });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(SupportTicketDeleteComponent, {
      width: '400px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('SupportTicket eliminado');
        this.loadSupportTickets(); // Carga o actualiza la lista de SupportTickets
      }
    });
  }

  override displayedColumns: string[] = ['id', 'user', 'actions'];

  showTable: boolean = false;
  buttonText: string = 'Mostrar SupportTickets';

  toggleSupportTickets() {
    if (this.showTable) {
      // Oculta la tabla
      this.showTable = false;
      this.buttonText = 'Mostrar SupportTickets'; // Cambia el texto del botón
    } else {
      // Carga y muestra la tabla
      this.loadSupportTickets();
      // Muestra la tabla
      this.showTable = true;
      this.buttonText = 'Ocultar SupportTickets'; // Cambia el texto del botón
    }
  }
  override ngOnInit(): void {
    // Con esta funcion se puede cargar los SupportTickets al inicio
    // this.loadSupportTickets();
    super.ngOnInit();
  }

  loadSupportTickets(): void {
    this.showTable = true;
    this.supportTicketService.getAllSupportTickets().subscribe((data) => {
      this.supportTickets = data;
    });
  }
}
