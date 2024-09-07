import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { PublisherService } from '../publisher.service';
import { Publisher } from '../publisher.model';

import { UserUtilsService } from 'src/app/services/user/user-util-service.service';

@Component({
  selector: 'app-publisher-create',
  templateUrl: './publisher-create.component.html',
  styleUrls: ['./publisher-create.component.scss'],
})
export class PublisherCreateComponent {
  publisher: Publisher = {
    id: '',
    publishername: '',
    foundation_date: new Date(),
    dissolution_date: new Date(),
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
    this.publisherService.createPublisher(this.publisher).subscribe({
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
