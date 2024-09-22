import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from '../categoria.model';

@Component({
  selector: 'app-categoria-detail',
  templateUrl: './categoria-detail.component.html',
  styleUrls: ['./categoria-detail.component.scss'],
})
export class CategoriaDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<CategoriaDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoria: Categoria }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
