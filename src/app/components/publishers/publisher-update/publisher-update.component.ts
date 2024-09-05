import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PublisherService } from '../publisher.service';
import { ErrorDialogComponent } from 'src/app/error-dialog/error-dialog.component.js';
import { Publisher } from '../publisher.model';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Data } from '@angular/router';

@Component({
  selector: 'app-publisher-update',
  templateUrl: './publisher-update.component.html',
})
export class PublisherUpdateComponent
  extends DialogComponent<Data, boolean>
  implements Data
{
  publisher: Publisher = {
    id: '',
    publishername: '',
    foundation_date: null,
    dissolution_date: null,
    status: '',
    creationtimestamp: '',
    creationuser: '',
    modificationtimestamp: new Date(),
    modificationuser: '',
  };

  constructor(
    private publisherService: PublisherService,
    dialog: DialogService
  ) {
    super(dialog);
  }

  /*onUpdatePublisher() {
    this.publisherService
      .updatePublisher(this.publisher.id, this.publisher)
      .subscribe({
        next: () => {
          this.showSuccessDialog('Publisher updated successfully');
        },
        error: (error) => {
          const errorMessage = error?.error?.msg || 'An error occurred';
          this.showErrorDialog(errorMessage);
        },
      });
  }

  private showSuccessDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message, type: 'success' },
    });
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage, type: 'error' },
    });
  }
*/
}
