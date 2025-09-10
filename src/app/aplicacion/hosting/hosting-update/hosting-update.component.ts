import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { Hosting, HostingPublisher } from '../hosting.model';
import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { HostingService } from '../hosting.service';
import { UserService } from 'src/app/services/user/user.service';
import { Publisher } from '../../publishers/publisher.model.js';
import { firstValueFrom } from 'rxjs';
import { PublisherService } from '../../publishers/publisher.service.js';

@Component({
  selector: 'app-hosting-update',
  templateUrl: './hosting-update.component.html',
  styleUrls: ['./hosting-update.component.scss'],
  standalone: false
})
export class HostingUpdateComponent {

  publicadores: Publisher[] = [];
  storageTypes: string[] = ['SSD', 'HDD', 'SSHD', 'SSD + HHD'];
  storageAmmount: number[] = [2000, 1000, 500, 256, 128];
  ramAmmount: number[] = [64, 32, 16, 12, 8, 4, 2];

  username: string | null = ''

  hostingPublisher: HostingPublisher;
  publisherToUpdate: Publisher = new Publisher();

  constructor(
    private hostingService: HostingService,
    private userService: UserService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<HostingUpdateComponent>,
    private publisherService: PublisherService,
    @Inject(MAT_DIALOG_DATA) public dataHostingPublisher: { hostingPublisher: HostingPublisher }
  ) {
    // Inicializo el hosting con data del dialog
    this.hostingPublisher = { ...dataHostingPublisher.hostingPublisher };
    this.loadService();
  }

  ngOnInit(): void {
  }
  async loadService() {
    this.username = await firstValueFrom(this.userService.getLoggedInUsername());
    this.publicadores = await firstValueFrom(this.publisherService.getAllPublishers());

    let indexPublicador = this.publicadores.indexOf(this.hostingPublisher.publisher);
    this.publisherToUpdate = this.publicadores[indexPublicador];
  }

  onUpdatehosting() {

    this.hostingPublisher.hosting.modificationtimestamp = new Date().toISOString()
    this.hostingPublisher.hosting.modificationuser = this.username!;

    this.hostingService
      .updateHosting(this.hostingPublisher.hosting.id, this.hostingPublisher.hosting)
      .subscribe({
        next: () => {

          this.hostingPublisher.publisher = { id: this.hostingPublisher.publisher.id } as Publisher;
          this.hostingPublisher.hosting = { id: this.hostingPublisher.hosting.id } as Hosting;

          this.hostingService
            .updateHostingPublisher(this.hostingPublisher.id, this.hostingPublisher)
            .subscribe({
              next: () => {
              },
              error: (error) => {
                const errorMessage = error?.error?.msg || 'Ocurrió un error';
                this.showErrorDialog(errorMessage);
              },
            });

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
      data: { title: 'Error', message, type: 'error' },
      width: '400px',
    });
  }

  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }
}
