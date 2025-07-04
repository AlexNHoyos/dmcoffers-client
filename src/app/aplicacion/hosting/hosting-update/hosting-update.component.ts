import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { Hosting } from '../hosting.model';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { HostingService } from '../hosting.service';

@Component({
    selector: 'app-hosting-update',
    templateUrl: './hosting-update.component.html',
    styleUrls: ['./hosting-update.component.scss'],
    standalone: false
})
export class HostingUpdateComponent {
  hosting: Hosting;

  constructor(
    private hostingService: HostingService,
    private userUtilsService: UserUtilsService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<HostingUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hosting: Hosting }
  ) {
    // Inicializo el hosting con data del dialog
    this.hosting = { ...data.hosting };
  }

  ngOnInit(): void {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.hosting.modificationuser = username;
        this.hosting.modificationtimestamp = new Date().toISOString();
      } else {
        console.log('No userId found');
      }
    });
  }

  onUpdatehosting() {
    const hostingToSend = {
      ...this.hosting,
      creationtimestamp: this.hosting.creationtimestamp
        ? new Date(this.hosting.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.hosting.modificationtimestamp
        ? new Date(this.hosting.modificationtimestamp).toISOString()
        : null,
    };

    console.log(hostingToSend);

    this.hostingService
      .updateHosting(this.hosting.id, hostingToSend)
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
