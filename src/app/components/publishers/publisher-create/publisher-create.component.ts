import { Component } from '@angular/core';
import { Data, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { PublisherService } from '../publisher.service';
import { Publisher } from '../publisher.model';

@Component({
  selector: 'app-publisher-create',
  templateUrl: './publisher-create.component.html',
  styleUrls: ['./publisher-create.component.scss'],
})
export class PublisherCreateComponent
  extends DialogComponent<Data, boolean>
  implements Data
{
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
    dialog: DialogService
  ) {
    super(dialog);
  }

  /*createPublisher(): void {
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

*/
}
