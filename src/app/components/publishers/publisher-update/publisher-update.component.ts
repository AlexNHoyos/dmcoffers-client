import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { PublisherService } from '../publisher.service';
import { Publisher } from '../publisher.model';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-publisher-update',
  templateUrl: './publisher-update.component.html',
})
export class PublisherUpdateComponent {
  publisher: Publisher;

  constructor(
    private publisherService: PublisherService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<PublisherUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { publisher: Publisher }
  ) {
    // Inicializo el publisher con data del dialog
    this.publisher = { ...data.publisher };
  }

  onUpdatePublisher() {
    this.publisherService
      .updatePublisher(this.publisher.id, this.publisher)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          const errorMessage = error?.error?.msg || 'Ocurrió un error';
          this.showErrorDialog(errorMessage);
        },
      });
  }

  private showErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message, type: 'error' },
    });
  }
}
