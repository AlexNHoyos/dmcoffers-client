import { Component, Type } from '@angular/core';
import { Publisher } from './publisher.model';
import { PublisherService } from './publisher.service';
import { CrudComponent } from '../crud/crud.component';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Data } from '@angular/router';
import { PublisherCreateComponent } from './publisher-create/publisher-create.component';
import { PublisherUpdateComponent } from './publisher-update/publisher-update.component';

@Component({
  selector: 'app-publisher',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss'],
})
export class PublisherComponent extends CrudComponent<Publisher> {
  getCreateComponent(): Type<DialogComponent<Publisher, boolean>> {
    return PublisherCreateComponent;
  }
  getEditComponent(): Type<DialogComponent<Publisher, boolean>> {
    return PublisherUpdateComponent;
  }

  constructor(
    private publisherService: PublisherService,
    dialogService: DialogService
  ) {
    super(publisherService, dialogService);
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
    // Lógica para editar el publisher
    console.log('Editar publisher', publisher);
  }

  deletePublisher(publisher: Publisher): void {
    // Lógica para eliminar el publisher
    console.log('Eliminar publisher', publisher);
  }
}
