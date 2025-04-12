import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { UserUtilsService } from 'src/app/services/user/user-util-service.service';

import { SupportTicket } from '../support-ticket.model';
import { SupportTicketService } from '../support-ticket.service';
import { ProximamenteService } from 'src/app/services/proximamente.service';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-support-ticket-create',
  templateUrl: './support-ticket-create.component.html',
  styleUrls: ['./support-ticket-create.component.scss'],
})
export class SupportTicketCreateComponent {
  supportTicket: SupportTicket = {
    id: 0,
    status: false,
    creationuser: '',
    creationtimestamp: new Date().toISOString(),
    modificationuser: '',
    modificationtimestamp: '',
    description: '',
  };
  constructor(
    private supportTicketService: SupportTicketService,
    private dialogRef: MatDialogRef<SupportTicketCreateComponent>,
    private userUtilsService: UserUtilsService,
    private proximamenteService: ProximamenteService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.supportTicket.creationuser = username;
      } else {
        console.log('No userId found');
      }
    });
  }

  createSupportTicket(): void {
    //Validacion de fechas
    const supportTicketToSend = {
      ...this.supportTicket,
      creationtimestamp: this.supportTicket.creationtimestamp
        ? new Date(this.supportTicket.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.supportTicket.modificationtimestamp
        ? new Date(this.supportTicket.modificationtimestamp).toISOString()
        : null,
    };

    this.supportTicketService
      .createSupportTicket(
        supportTicketToSend,
        supportTicketToSend.creationuser
      )
      .subscribe({
        next: (response) => {
          console.log('supportTicket creado exitosamente', response);
          this.dialogRef.close(true); // Cierra el diálogo y indica que se guardaron los cambios
          this.showSuccessDialog();
        },
        error: (error) => {
          console.error('Error creando supportTicket', error);
        },
      });
  }
  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }

  showProximamente(): void {
    this.proximamenteService.mostrarMensaje();
  }

  private showSuccessDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: 'Ticket creado exitosamente', type: 'success' },
    });
  }
}
