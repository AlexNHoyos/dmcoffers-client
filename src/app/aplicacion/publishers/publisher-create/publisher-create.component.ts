import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Publisher } from '../publisher.model';

import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher-create',
  templateUrl: './publisher-create.component.html',
  styleUrls: ['./publisher-create.component.scss'],
})
export class PublisherCreateComponent {
  publisher: Publisher = {
    id: '',
    publishername: '',
    foundation_date: new Date().toISOString(),
    dissolution_date: new Date().toISOString(),
    status: '',
    creationtimestamp: new Date().toISOString(),
    creationuser: '',
    modificationtimestamp: '',
    modificationuser: '',
  };
  constructor(
    private publisherService: PublisherService,
    private dialogRef: MatDialogRef<PublisherCreateComponent>,
    private userUtilsService: UserUtilsService
  ) {}
  ngOnInit(): void {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.publisher.creationuser = username;
      } else {
        console.log('No userId found');
      }
    });
  }

  createPublisher(): void {
    //Validacion de fechas
    const publisherToSend = {
      ...this.publisher,
      foundation_date: this.publisher.foundation_date
        ? new Date(this.publisher.foundation_date).toISOString()
        : null,
      dissolution_date: this.publisher.dissolution_date
        ? new Date(this.publisher.dissolution_date).toISOString()
        : null,
      creationtimestamp: this.publisher.creationtimestamp
        ? new Date(this.publisher.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.publisher.modificationtimestamp
        ? new Date(this.publisher.modificationtimestamp).toISOString()
        : null,
    };

    console.log(publisherToSend);
    this.publisherService.createPublisher(publisherToSend).subscribe({
      next: (response) => {
        console.log('Publisher creado exitosamente', response);
        this.dialogRef.close(true); // Cierra el diálogo y indica que se guardaron los cambios
      },
      error: (error) => {
        console.error('Error creando publisher', error);
      },
    });
  }
  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }
}
