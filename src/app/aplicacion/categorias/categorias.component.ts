import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria.model';
import { CategoriaService } from './categoria.service';
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
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog
  ) {}
  
  displayedColumns: string[] = ['id', 'descripcion', 'actions'];

  ngOnInit(): void {
    this.loadCategorias();
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
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCategorias(); // Carga o actualiza la lista de categorias
      }
    });
  }

  showDetails(id: number): void {
    this.categoriaService.getCategoria(id).subscribe((categoria) => {
      const dialogRef = this.dialog.open(CategoriaDetailComponent, {
        width: '400px',
        disableClose: true,
        data: { categoria },
      });
    });
  }

  openEditDialog(id: number): void {
    this.categoriaService.getCategoria(id).subscribe((categoria) => {
      const dialogRef = this.dialog.open(CategoriaUpdateComponent, {
        width: '400px',
        disableClose: true,
        data: { categoria },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadCategorias(); // Carga o actualiza la lista de categorias
        }
      });
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(CategoriaDeleteComponent, {
      width: '400px',
      disableClose: true,
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCategorias(); // Carga o actualiza la lista de categorias
      }
    });
  }

  loadCategorias(): void {
    this.categoriaService.getAllCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }
}
