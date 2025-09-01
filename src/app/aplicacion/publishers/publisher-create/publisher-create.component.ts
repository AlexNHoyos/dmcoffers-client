import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Publisher } from '../publisher.model';

import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher-create',
  templateUrl: './publisher-create.component.html',
  styleUrls: ['./publisher-create.component.scss'],
  standalone: false
})
export class PublisherCreateComponent {
  today: Date = new Date();
  publisher: Publisher = {
    id: 0,
    publishername: '',
    foundation_date: null,
    dissolution_date: null,
    status: true,
    creationtimestamp: new Date().toISOString(),
    creationuser: '',
    modificationtimestamp: null,
    modificationuser: null,
  };
  constructor(
    private publisherService: PublisherService,
    private dialogRef: MatDialogRef<PublisherCreateComponent>,
    private userUtilsService: UserUtilsService
  ) { }
  ngOnInit(): void {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.publisher.creationuser = username;
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

    this.publisherService.createPublisher(publisherToSend).subscribe({
      next: (response) => {
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
