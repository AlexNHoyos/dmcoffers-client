import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ErrorDialogComponent } from '../../../components/error-dialog/error-dialog.component';
import { PublisherService } from '../publisher.service';

@Component({
    selector: 'app-publisher-delete',
    templateUrl: './publisher-delete.component.html',
    standalone: false
})
export class PublisherDeleteComponent implements OnInit {
  publisherName: string = '';
  successMessage: string | null = null;

  constructor(
    private publisherService: PublisherService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<PublisherDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.publisherService.getPublisher(this.data.id).subscribe({
      next: (publisher) => {
        this.publisherName = publisher.publishername;
      },
      error: () => {
        this.publisherName = 'Desconocido';
      },
    });
  }

  deletePublisher(): void {
    this.publisherService.deletePublisher(this.data.id).subscribe({
      next: () => {
        this.successMessage = 'Publisher eliminado satisfactoriamente';
        this.dialogRef.close(true);
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
    this.dialogRef.close(false);
  }
}
