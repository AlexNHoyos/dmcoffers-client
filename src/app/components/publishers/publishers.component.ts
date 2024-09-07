import { Component, Type } from '@angular/core';
import { Publisher } from './publisher.model';
import { PublisherService } from './publisher.service';
import { CrudComponent } from '../crud/crud.component';
import { PublisherCreateComponent } from './publisher-create/publisher-create.component';
import { PublisherUpdateComponent } from './publisher-update/publisher-update.component';
import { MatDialog } from '@angular/material/dialog';
import { PublisherDeleteComponent } from './publisher-delete/publisher-delete.component';
import { PublisherDetailComponent } from './publisher-detail/publisher-detail.component';
@Component({
  selector: 'app-publisher',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss'],
})
export class PublisherComponent extends CrudComponent<Publisher> {
  publishers: Publisher[] = [];

  constructor(
    private publisherService: PublisherService,
    override dialog: MatDialog
  ) {
    super(publisherService, dialog);
  }

  getCreateComponent() {
    return PublisherCreateComponent;
  }
  getEditComponent() {
    return PublisherUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PublisherCreateComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Publisher creado');
        this.loadPublishers(); // Carga o actualiza la lista de publishers
      }
    });
  }

  showDetails(id: string): void {
    this.publisherService.getPublisher(id).subscribe((publisher) => {
      const dialogRef = this.dialog.open(PublisherDetailComponent, {
        width: '400px',
        data: { publisher },
      });
      /*  No es necesario porque no edito los datos adentro del dialog, pero podria implementarse a futuro
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadPublishers(); // Carga o actualiza la lista de publishers
        }
      });*/
    });
  }

  openEditDialog(id: string): void {
    this.publisherService.getPublisher(id).subscribe((publisher) => {
      const dialogRef = this.dialog.open(PublisherUpdateComponent, {
        width: '400px',
        data: { publisher },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Publisher actualizado');
          this.loadPublishers(); // Carga o actualiza la lista de publishers
        }
      });
    });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(PublisherDeleteComponent, {
      width: '400px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Publisher eliminado');
        this.loadPublishers(); // Carga o actualiza la lista de publishers
      }
    });
  }

  override displayedColumns: string[] = [
    'id',
    'publishername',
    'view',
    'edit',
    'delete',
  ];

  showTable: boolean = false;
  buttonText: string = 'Mostrar Publishers';

  togglePublishers() {
    if (this.showTable) {
      // Oculta la tabla
      this.showTable = false;
      this.buttonText = 'Mostrar Publishers'; // Cambia el texto del botón
    } else {
      // Carga y muestra la tabla
      this.loadPublishers();
      // Muestra la tabla
      this.showTable = true;
      this.buttonText = 'Ocultar publishers'; // Cambia el texto del botón
    }
  }
  override ngOnInit(): void {
    // Con esta funcion se puede cargar los publishers al inicio
    // this.loadPublishers();
    super.ngOnInit();
  }

  loadPublishers(): void {
    this.showTable = true;
    this.publisherService.getAllPublishers().subscribe((data) => {
      this.publishers = data;
    });
  }
}
