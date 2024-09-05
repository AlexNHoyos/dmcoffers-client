import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { PublisherService } from '../publisher.service';
import { Publisher } from '../publisher.model';

@Component({
  selector: 'app-publisher-create',
  templateUrl: './publisher-create.component.html',
  styleUrls: ['./publisher-create.component.scss'],
})
export class PublisherCreateComponent {
  publisher: Publisher = {
    id: '',
    publishername: '',
    foundation_date: new Date(), // Establecer una fecha por defecto
    dissolution_date: new Date(),
    status: '',
    creationtimestamp: new Date().toISOString(),
    creationuser: '',
    modificationtimestamp: null,
    modificationuser: '',
  };

  constructor(
    private publisherService: PublisherService,
    private dialogRef: MatDialogRef<PublisherCreateComponent>
  ) {}

  createPublisher(): void {
    this.publisherService.createPublisher(this.publisher).subscribe(
      (response) => {
        console.log('Publisher creado exitosamente', response);
        this.dialogRef.close(true); // Cierra el diálogo y indica que se guardaron los cambios
      },
      (error) => {
        console.error('Error creando publisher', error);
      }
    );
  }
  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }
}
