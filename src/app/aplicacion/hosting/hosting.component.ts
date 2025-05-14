import { Component } from '@angular/core';
import { Hosting } from './hosting.model';
import { HostingService } from './hosting.service';
import { CrudComponent } from '../../components/crud/crud.component';
import { HostingCreateComponent } from './hosting-create/hosting-create.component';
import { HostingUpdateComponent } from './hosting-update/hosting-update.component';
import { MatDialog } from '@angular/material/dialog';
import { HostingDeleteComponent } from './hosting-delete/hosting-delete.component';
import { HostingDetailComponent } from './hosting-detail/hosting-detail.component';

@Component({
    selector: 'app-hosting',
    templateUrl: './hosting.component.html',
    styleUrls: ['./hosting.component.scss'],
    standalone: false
})
export class HostingComponent extends CrudComponent<Hosting> {
  hostings: Hosting[] = [];

  constructor(
    private hostingService: HostingService,
    override dialog: MatDialog
  ) {
    super(hostingService, dialog);
  }

  getCreateComponent() {
    return HostingCreateComponent;
  }
  getEditComponent() {
    return HostingUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(HostingCreateComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Hosting creado');
        this.loadHostings(); // Carga o actualiza la lista de Hostings
      }
    });
  }

  showDetails(id: number): void {
    this.hostingService.getHosting(id).subscribe((hosting) => {
      const dialogRef = this.dialog.open(HostingDetailComponent, {
        width: '400px',
        data: { hosting },
      });
      /*  No es necesario porque no edito los datos adentro del dialog, pero podria implementarse a futuro
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadHostings(); // Carga o actualiza la lista de Hostings
        }
      });*/
    });
  }

  openEditDialog(id: number): void {
    this.hostingService.getHosting(id).subscribe((hosting) => {
      const dialogRef = this.dialog.open(HostingUpdateComponent, {
        width: '400px',
        data: { hosting },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Hosting actualizado');
          this.loadHostings(); // Carga o actualiza la lista de Hostings
        }
      });
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(HostingDeleteComponent, {
      width: '400px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Hosting eliminado');
        this.loadHostings(); // Carga o actualiza la lista de Hostings
      }
    });
  }

  override displayedColumns: string[] = ['id', 'name', 'actions'];

  showTable: boolean = false;
  buttonText: string = 'Mostrar Hostings';

  toggleHostings() {
    if (this.showTable) {
      // Oculta la tabla
      this.showTable = false;
      this.buttonText = 'Mostrar Hostings'; // Cambia el texto del botón
    } else {
      // Carga y muestra la tabla
      this.loadHostings();
      // Muestra la tabla
      this.showTable = true;
      this.buttonText = 'Ocultar Hostings'; // Cambia el texto del botón
    }
  }
  override ngOnInit(): void {
    // Con esta funcion se puede cargar los Hostings al inicio
    // this.loadHostings();
    super.ngOnInit();
  }

  loadHostings(): void {
    this.showTable = true;
    this.hostingService.getAllHostings().subscribe((data) => {
      this.hostings = data;
    });
  }
}
