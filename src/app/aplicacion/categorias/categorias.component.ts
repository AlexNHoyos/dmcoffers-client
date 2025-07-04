import { Component } from '@angular/core';
import { Categoria } from './categoria.model';
import { CategoriaService } from './categoria.service';
import { CrudComponent } from '../../components/crud/crud.component';
import { CategoriaCreateComponent } from './categoria-create/categoria-create.component';
import { CategoriaUpdateComponent } from './categoria-update/categoria-update.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaDeleteComponent } from './categoria-delete/categoria-delete.component';
import { CategoriaDetailComponent } from './categoria-detail/categoria-detail.component';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.scss'],
    standalone: false
})
export class CategoriasComponent extends CrudComponent<Categoria> {
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    override dialog: MatDialog
  ) {
    super(categoriaService, dialog);

    // Carga y muestra la tabla
    this.loadCategorias();
    // Muestra la tabla
    this.showTable = true;
    this.buttonText = 'Ocultar Categorias'; // Cambia el texto del botón
  }

  getCreateComponent() {
    return CategoriaCreateComponent;
  }

  getEditComponent() {
    return CategoriaUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CategoriaCreateComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Categoria creado');
        this.loadCategorias(); // Carga o actualiza la lista de categorias
      }
    });
  }

  showDetails(id: number): void {
    this.categoriaService.getCategoria(id).subscribe((categoria) => {
      const dialogRef = this.dialog.open(CategoriaDetailComponent, {
        width: '400px',
        data: { categoria },
      });
      /*  No es necesario porque no edito los datos adentro del dialog, pero podria implementarse a futuro
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadcategorias(); // Carga o actualiza la lista de categorias
        }
      });*/
    });
  }

  openEditDialog(id: number): void {
    this.categoriaService.getCategoria(id).subscribe((categoria) => {
      const dialogRef = this.dialog.open(CategoriaUpdateComponent, {
        width: '400px',
        data: { categoria },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Categoria actualizado');
          this.loadCategorias(); // Carga o actualiza la lista de categorias
        }
      });
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(CategoriaDeleteComponent, {
      width: '400px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('categoria eliminada');
        this.loadCategorias(); // Carga o actualiza la lista de categorias
      }
    });
  }

  override displayedColumns: string[] = ['id', 'descripcion', 'actions'];

  showTable: boolean = false;
  buttonText: string = 'Mostrar Categorias';

  override ngOnInit(): void {
    // Con esta funcion se puede cargar los categorias al inicio
    // this.loadcategorias();
    super.ngOnInit();
  }

  loadCategorias(): void {
    this.showTable = true;
    this.categoriaService.getAllCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }
}
