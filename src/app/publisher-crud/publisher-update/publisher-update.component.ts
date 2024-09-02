import { Component } from '@angular/core';
import { Publisher } from '../../models/publisher.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { PublisherService } from 'src/app/services/publisher/publisher.service';

@Component({
  selector: 'app-publisher-update',
  templateUrl: './publisher-update.component.html',
})
export class PublisherUpdateComponent {
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
    private dialog: MatDialog
  ) {}

  onUpdatePublisher() {
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
}
