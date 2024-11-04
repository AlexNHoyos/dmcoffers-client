import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ErrorDialogComponent } from '../../../components/error-dialog/error-dialog.component';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.scss'],
})
export class CategoriaDeleteComponent implements OnInit {
  categoriaId: number = 0;
  categoriaNombre: string = '';
  successMessage: string | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CategoriaDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.categoriaService.getCategoria(this.data.id).subscribe({
      next: (categoria) => {
        this.categoriaId = categoria.id;
        this.categoriaNombre = categoria.description;
      },
      error: () => {
        console.log('Error!!!');
      },
    });
  }

  deleteCategoria(): void {
    this.categoriaService.delete(this.data.id).subscribe({
      next: () => {
        this.successMessage = 'Categoria eliminada satisfactoriamente';
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
