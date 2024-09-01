import { Component } from '@angular/core';
import { PublisherService } from '../../publisher.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-publisher-delete',
  templateUrl: './publisher-delete.component.html',
})
export class PublisherDeleteComponent {
  publisherId: string = '';
  successMessage: string | null = null;

  constructor(
    private publisherService: PublisherService,
    private dialog: MatDialog
  ) {}

  onDeletePublisher() {
    this.publisherService.deletePublisher(this.publisherId).subscribe({
      next: () => {
        this.successMessage = 'Publisher deleted successfully';
        this.showSuccessDialog();
      },
      error: (error) => {
        const errorMessage = error?.error?.msg || 'An error occurred';
        this.showErrorDialog(errorMessage);
      },
    });
  }

  private showSuccessDialog(): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: this.successMessage, type: 'success' },
    });
  }

  private showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage, type: 'error' },
    });
  }
}
