import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { PublisherService } from '../publisher.service';
import { Publisher } from '../publisher.model';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { CURRENT_DATE } from '../../constants/constants';

@Component({
  selector: 'app-publisher-update',
  templateUrl: './publisher-update.component.html',
})
export class PublisherUpdateComponent {
  publisher: Publisher;

  constructor(
    private publisherService: PublisherService,
    private userUtilsService: UserUtilsService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<PublisherUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { publisher: Publisher }
  ) {
    // Inicializo el publisher con data del dialog
    this.publisher = { ...data.publisher };
  }

  ngOnInit(): void {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.publisher.modificationuser = username;
        this.publisher.modificationtimestamp = new Date();
      } else {
        console.log('No userId found');
      }
    });
  }

  onUpdatePublisher() {
    if (this.publisher.dissolution_date instanceof Date) {
      this.publisher.dissolution_date =
        this.publisher.dissolution_date.toISOString();
    }
    if (this.publisher.modificationtimestamp instanceof Date) {
      this.publisher.modificationtimestamp =
        this.publisher.modificationtimestamp.toISOString();
    }

    console.log(this.publisher);

    this.publisherService
      .updatePublisher(this.publisher.id, this.publisher)
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.log('Error:', error.error.errors);
          const errorMessage = error?.error?.msg || 'Ocurrió un error';
          this.showErrorDialog(errorMessage);
        },
      });
  }

  private showErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { title: 'Error', message, type: 'error' },
      width: '400px',
    });
  }

  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }
}
