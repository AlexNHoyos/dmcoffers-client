import { Component, Type } from '@angular/core';
import { Publisher } from './publisher.model';
import { PublisherService } from './publisher.service';
import { CrudComponent } from '../crud/crud.component';
import { PublisherCreateComponent } from './publisher-create/publisher-create.component';
import { PublisherUpdateComponent } from './publisher-update/publisher-update.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-publisher',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss'],
})
export class PublisherComponent extends CrudComponent<Publisher> {
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

  override displayedColumns: string[] = [
    'id',
    'publishername',
    'foundation_date',
    'dissolution_date',
    'status',
    'creationtimestamp',
    'creationuser',
    'modificationtimestamp',
    'modificationuser',
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
    this.publisherService.getAll('', '', 1).subscribe((data) => {
      //this.publishers = data;
    });
  }

  editPublisher(publisher: Publisher): void {
    const dialogRef = this.dialog.open(PublisherUpdateComponent, {
      data: { publisher },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Refresh the list or handle the update confirmation here
      }
    });
  }

  deletePublisher(publisher: Publisher): void {
    // Lógica para eliminar el publisher
    console.log('Eliminar publisher', publisher);
  }
}
