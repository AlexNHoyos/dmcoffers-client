import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ErrorDialogComponent } from '../../../components/error-dialog/error-dialog.component';
import { DesarrolladoresService } from '../desarrolladores.service';
@Component({
  selector: 'app-desarrolladores-delete',
  templateUrl: './desarrolladores-delete.component.html',
})
export class DesarrolladoresDeleteComponent implements OnInit {
  desarrolladorName: string = '';
  successMessage: string | null = null;

  constructor(
    private desarrolladoresService: DesarrolladoresService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DesarrolladoresDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) { }

  ngOnInit(): void {
    this.desarrolladoresService.getDesarrollador(this.data.id).subscribe({
      next: (desarrollador) => {
        this.desarrolladorName = desarrollador.developername;
      },
      error: () => {
        this.desarrolladorName = 'Desconocido';
      },
    });
  }

  deleteDesarrollador(): void {
    this.desarrolladoresService.delete(this.data.id).subscribe({
      next: () => {
        this.successMessage = 'Desarrollador eliminado satisfactoriamente';
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error?.error?.msg || 'Ocurrió un error';
        this.showErrorDialog(errorMessage);
      },
    });
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage, type: 'error' },
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

