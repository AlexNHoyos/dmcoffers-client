import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Categoria } from '../categoria.model';

import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.scss'],
})
export class CategoriaCreateComponent {
  categoria: Categoria = {
    id: '',
    description: '',
    creationtimestamp: new Date().toISOString(),
    creationuser: '',
    modificationtimestamp: '',
    modificationuser: '',
  };
  constructor(
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<CategoriaCreateComponent>,
    private userUtilsService: UserUtilsService
  ) {}

  ngOnInit(): void {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.categoria.creationuser = username;
      } else {
        console.log('No userId found');
      }
    });
  }

  createCategoria(): void {
    //Validacion de fechas
    const categoriaToSend = {
      ...this.categoria,
      creationtimestamp: this.categoria.creationtimestamp
        ? new Date(this.categoria.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.categoria.modificationtimestamp
        ? new Date(this.categoria.modificationtimestamp).toISOString()
        : null,
    };

    this.categoriaService.createCategoria(categoriaToSend).subscribe({
      next: (response) => {
        console.log('Categoria creado exitosamente', response);
        this.dialogRef.close(true); // Cierra el diálogo y indica que se guardaron los cambios
      },
      error: (error) => {
        console.log(categoriaToSend);
        console.error('Error creando categoria', error);
      },
    });
  }
  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }
}
