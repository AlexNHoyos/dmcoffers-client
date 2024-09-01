import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublisherService } from '../../publisher.service';
import { Publisher } from '../../models/publisher.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

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
    private router: Router,
    private dialog: MatDialog
  ) {}

  createPublisher(): void {
    this.publisherService.createPublisher(this.publisher).subscribe(
      (response) => {
        console.log('Publisher creado exitosamente', response);
      },
      (error) => {
        console.error('Error creando publisher', error);
        this.openErrorDialog(error);
      }
    );
  }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage },
    });
  }
}
