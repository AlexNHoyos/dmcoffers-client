import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ErrorDialogComponent } from '../../../components/error-dialog/error-dialog.component';
import { HostingService } from '../hosting.service';

@Component({
  selector: 'app-hosting-delete',
  templateUrl: './hosting-delete.component.html',
  styleUrls: ['./hosting-delete.component.scss'],
  standalone: false
})
export class HostingDeleteComponent implements OnInit {
  hostingName: string = '';
  successMessage: string | null = null;

  constructor(
    private hostingService: HostingService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<HostingDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, idHosting: number }
  ) { }

  ngOnInit(): void {
    this.hostingService.getHostingPublisher(this.data.id).subscribe({
      next: (hostingpublisher) => {
        this.hostingName = hostingpublisher.hosting.name;
      },
      error: () => {
        this.hostingName = 'Desconocido';
      },
    });
  }

  deleteHosting(): void {
    this.hostingService.deleteHostingPublisher(this.data.id).subscribe({
      next: () => {
        this.successMessage = 'Hosting publisher eliminado satisfactoriamente';
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error?.error?.msg || 'Ocurrió un error';
        this.showErrorDialog(errorMessage);
      },
    });

    this.hostingService.deleteHosting(this.data.idHosting).subscribe({
      next: () => {
        this.successMessage = 'Hosting eliminado satisfactoriamente';
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
