import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { JuegoService } from '../../juegos.service';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Component({
    selector: 'app-juego-delete',
    templateUrl: './juego-delete.component.html',
    styleUrls: ['./juego-delete.component.scss'],
    standalone: false
})
export class JuegoDeleteComponent implements OnInit {
  gamename: string = '';
  successMessage: string | null = null;

  constructor(
    private juegoService: JuegoService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<JuegoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.juegoService.getJuego(this.data.id).subscribe({
      next: (juego) => {
        this.gamename = juego.gamename;
      },
      error: () => {
        this.gamename = 'Desconocido';
      },
    });
  }

  deleteJuego(): void {
    this.juegoService.delete(this.data.id).subscribe({
      next: () => {
        this.successMessage = 'Juego eliminado satisfactoriamente';
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
