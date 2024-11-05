import { Component, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Juego } from '../juegos.model';
import { CrudComponent } from 'src/app/components/crud/crud.component';
import { JuegoService } from '../juegos.service';
import { JuegoCreateComponent } from './juego-create/juego-create.component';
import { JuegoUpdateComponent } from './juego-update/juego-update.component';
import { JuegoDeleteComponent } from './juego-delete/juego-delete.component';
import { JuegoDetailDialogComponent } from './juego-detail-dialog/juego-detail-dialog.component';

@Component({
  selector: 'app-juegos-crud',
  templateUrl: './juegos-crud.component.html',
  styleUrls: ['./juegos-crud.component.scss'],
})
export class JuegosCrudComponent extends CrudComponent<Juego> {
  juegos: Juego[] = [];
  constructor(private juegoService: JuegoService, override dialog: MatDialog) {
    super(juegoService, dialog);
  }

  getCreateComponent() {
    return JuegoCreateComponent;
  }
  getEditComponent() {
    return JuegoUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(JuegoCreateComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Juego creado');
        this.loadJuegos(); // Carga o actualiza la lista de juegos
      }
    });
  }

  showDetails(id: number): void {
    this.juegoService.getJuego(id).subscribe((juego) => {
      const dialogRef = this.dialog.open(JuegoDetailDialogComponent, {
        width: '400px',
        data: { juego },
      });
      console.log(juego);
      /*  No es necesario porque no edito los datos adentro del dialog, pero podria implementarse a futuro
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadjuegos(); // Carga o actualiza la lista de juegos
        }
      });*/
    });
  }

  openEditDialog(id: number): void {
    this.juegoService.getJuego(id).subscribe((juego) => {
      const dialogRef = this.dialog.open(JuegoUpdateComponent, {
        width: '400px',
        data: { juego },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Juego actualizado');
          this.loadJuegos(); // Carga o actualiza la lista de juegos
        }
      });
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(JuegoDeleteComponent, {
      width: '400px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Juego eliminado');
        this.loadJuegos(); // Carga o actualiza la lista de juegos
      }
    });
  }

  override displayedColumns: string[] = ['id', 'gamename', 'actions'];

  showTable: boolean = false;
  buttonText: string = 'Mostrar Juegos';

  toggleJuegos() {
    if (this.showTable) {
      // Oculta la tabla
      this.showTable = false;
      this.buttonText = 'Mostrar Juegos'; // Cambia el texto del botón
    } else {
      // Carga y muestra la tabla
      this.loadJuegos();
      // Muestra la tabla
      this.showTable = true;
      this.buttonText = 'Ocultar juegos'; // Cambia el texto del botón
    }
  }
  override ngOnInit(): void {
    // Con esta funcion se puede cargar los juegos al inicio
    // this.loadjuegos();
    super.ngOnInit();
  }

  loadJuegos(): void {
    this.showTable = true;
    this.juegoService.getJuegos().subscribe((data) => {
      this.juegos = data;
    });
  }
}
