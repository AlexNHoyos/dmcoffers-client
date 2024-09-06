import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PublisherService } from '../publisher.service';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-publisher-delete',
  templateUrl: './publisher-delete.component.html',
})
export class PublisherDeleteComponent implements OnInit {
  publisherName: string = '';
  successMessage: string | null = null;

  constructor(
    private publisherService: PublisherService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PublisherDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  ngOnInit(): void {
    this.publisherService.getPublisher(this.data.id).subscribe({
      next: (publisher) => {
        this.publisherName = publisher.publishername; // Show publisher name in the dialog
      },
      error: () => {
        this.publisherName = 'Desconocido'; // In case there's an error fetching the publisher
      },
    });
  }

  deletePublisher(): void {
    this.publisherService.delete(this.data.id).subscribe({
      next: () => {
        this.successMessage = 'Publisher eliminado satisfactoriamente';
        this.dialogRef.close(true); // Close the dialog with a success response
      },
      error: (error) => {
        const errorMessage = error?.error?.msg || 'Ocurrió un error';
        this.showErrorDialog(errorMessage);
      },
    });
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage, type: 'error' },
    });
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog on cancel without doing anything
  }
}
