import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Juego } from '../../juegos.model';

@Component({
  selector: 'app-juego-detail-dialog',
  templateUrl: './juego-detail-dialog.component.html',
  styleUrls: ['./juego-detail-dialog.component.scss'],
})
export class JuegoDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<JuegoDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { juego: Juego }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
