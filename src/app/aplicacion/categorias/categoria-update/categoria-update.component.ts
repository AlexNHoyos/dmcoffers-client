import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { Categoria } from '../categoria.model';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { CategoriaService } from '../categoria.service';

@Component({
    selector: 'app-categoria-update',
    templateUrl: './categoria-update.component.html',
    styleUrls: ['./categoria-update.component.scss'],
    standalone: false
})
export class CategoriaUpdateComponent {
  categoria: Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private userUtilsService: UserUtilsService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CategoriaUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoria: Categoria }
  ) {
    // Inicializo la categoria con data del dialog
    this.categoria = { ...data.categoria };
  }

  ngOnInit(): void {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.categoria.modificationuser = username;
        this.categoria.modificationtimestamp = new Date().toISOString();
      } else {
        console.log('No userId found');
      }
    });
  }

  onUpdateCategoria() {
    const categoriaToSend = {
      ...this.categoria,
      creationtimestamp: this.categoria.creationtimestamp
        ? new Date(this.categoria.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.categoria.modificationtimestamp
        ? new Date(this.categoria.modificationtimestamp).toISOString()
        : null,
    };

    this.categoriaService
      .updateCategoria(this.categoria.id, categoriaToSend)
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
