import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { Desarrollador } from '../desarrolladores.models.js';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { DesarrolladoresService } from '../desarrolladores.service';

@Component({
  selector: 'app-desarrolladores-update',
  templateUrl: './desarrolladores-update.component.html',
})
export class DesarrolladoresUpdateComponent {
  desarrollador: Desarrollador;

  constructor(
    private desarrolladorService: DesarrolladoresService,
    private userUtilsService: UserUtilsService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DesarrolladoresUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { desarrollador: Desarrollador }
  ) {
    // Inicializo el publisher con data del dialog
    this.desarrollador = { ...data.desarrollador };
  }

  ngOnInit(): void {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.desarrollador.modificationuser = username;
        this.desarrollador.modificationtimestamp = new Date().toISOString();
      } else {
        console.log('No userId found');
      }
    });
  }

  onUpdateDesarrollador() {
    const desarrolladorToSend = {
      ...this.desarrollador,
      foundation_date: this.desarrollador.foundation_date
        ? new Date(this.desarrollador.foundation_date).toISOString()
        : null,
      dissolution_date: this.desarrollador.dissolution_date
        ? new Date(this.desarrollador.dissolution_date).toISOString()
        : null,
      creationtimestamp: this.desarrollador.creationtimestamp
        ? new Date(this.desarrollador.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.desarrollador.modificationtimestamp
        ? new Date(this.desarrollador.modificationtimestamp).toISOString()
        : null,
    };

    console.log(desarrolladorToSend);

    this.desarrolladorService
      .updateDesarrollador(this.desarrollador.id, desarrolladorToSend)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.log('Error:', error.error.errors);
          const errorMessage = error?.error?.msg || 'Ocurrió un error';
          this.showErrorDialog(errorMessage);
        },
      });
  }

  private showErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { title: 'Error', message, type: 'error' },
      width: '400px',
    });
  }

  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }
}

