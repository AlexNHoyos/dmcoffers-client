import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { PublisherService } from '../publisher.service';
import { Publisher } from '../publisher.model';

import { UserService } from 'src/app/services/user/user.service';

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
    modificationtimestamp: null,
    modificationuser: '',
  };

  constructor(
    private publisherService: PublisherService,
    private dialogRef: MatDialogRef<PublisherCreateComponent>,
    private userService: UserService
  ) {
    this.setLoggedInUser();
  }

  setLoggedInUser(): void {
    // Obtén el userId desde el UserService
    this.userService.getUserId().subscribe((userId) => {
      if (userId) {
        // Llama a getUser con el userId y suscríbete al observable
        this.userService.getUser(userId).subscribe((user) => {
          this.publisher.creationuser = user.username; // Asigna el campo
        });
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
