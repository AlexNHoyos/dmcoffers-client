import { Component, Type } from '@angular/core';
import { Desarrollador } from './desarrolladores.models';
import { DesarrolladoresService } from './desarrolladores.service';
import { CrudComponent } from '../../components/crud/crud.component';
import { DesarrolladoresCreateComponent } from './desarrolladores-create/desarrolladores-create.component';
import { DesarrolladoresUpdateComponent } from './desarrolladores-update/desarrolladores-update.component';
import { MatDialog } from '@angular/material/dialog';
import { DesarrolladoresDeleteComponent } from './desarrolladores-delete/desarrolladores-delete.component';
import { DesarrolladoresDetailComponent } from './desarrolladores-detail/desarrolladores-detail.component';

@Component({
  selector: 'app-desarrolladores',
  templateUrl: './desarrolladores.component.html',
  styleUrls: ['./desarrolladores.component.scss'],
})
export class DesarrolladoresComponent extends CrudComponent<Desarrollador> {
  desarrolladores: Desarrollador[] = [];

  constructor(
    private desarrolladoresService: DesarrolladoresService,
    override dialog: MatDialog
  ) {
    super(desarrolladoresService, dialog);
  }

  getCreateComponent() {
    return DesarrolladoresCreateComponent;
  }
  getEditComponent() {
    return DesarrolladoresUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DesarrolladoresCreateComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Desarrollador creado');
        this.loadDesarrolladores(); // Carga o actualiza la lista de publishers
      }
    });
  }

  showDetails(id: number): void {
    this.desarrolladoresService
      .getDesarrollador(id)
      .subscribe((desarrollador) => {
        const dialogRef = this.dialog.open(DesarrolladoresDetailComponent, {
          width: '400px',
          data: { desarrollador },
        });
        /*  No es necesario porque no edito los datos adentro del dialog, pero podria implementarse a futuro
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadPublishers(); // Carga o actualiza la lista de publishers
        }
      });*/
      });
  }

  openEditDialog(id: number): void {
    this.desarrolladoresService
      .getDesarrollador(id)
      .subscribe((desarrollador) => {
        const dialogRef = this.dialog.open(DesarrolladoresUpdateComponent, {
          width: '400px',
          data: { desarrollador },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            console.log('Desarrollador actualizado');
            this.loadDesarrolladores(); // Carga o actualiza la lista de publishers
          }
        });
      });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DesarrolladoresDeleteComponent, {
      width: '400px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Desarrollador eliminado');
        this.loadDesarrolladores(); // Carga o actualiza la lista de publishers
      }
    });
  }

  override displayedColumns: string[] = ['id', 'developername', 'actions'];

  showTable: boolean = false;
  buttonText: string = 'Mostrar Desarrolladores';

  toggleDesarrolladores() {
    if (this.showTable) {
      // Oculta la tabla
      this.showTable = false;
      this.buttonText = 'Mostrar Desarrolladores'; // Cambia el texto del botón
    } else {
      // Carga y muestra la tabla
      this.loadDesarrolladores();
      // Muestra la tabla
      this.showTable = true;
      this.buttonText = 'Ocultar desarrollador'; // Cambia el texto del botón
    }
  }
  override ngOnInit(): void {
    // Con esta funcion se puede cargar los publishers al inicio
    // this.loadPublishers();
    super.ngOnInit();
  }

  loadDesarrolladores(): void {
    this.showTable = true;
    this.desarrolladoresService.getAllDesarrolladores().subscribe((data) => {
      this.desarrolladores = data;
    });
  }
}
