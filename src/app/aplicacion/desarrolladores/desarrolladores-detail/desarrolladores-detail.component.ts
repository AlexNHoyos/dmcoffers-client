import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Desarrollador } from '../desarrolladores.models.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-desarrolladores-detail',
  templateUrl: './desarrolladores-detail.component.html',
  styleUrls: ['./desarrolladores-detail.component.scss'],
})
export class DesarrolladoresDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<DesarrolladoresDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { desarrollador: Desarrollador }
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}

