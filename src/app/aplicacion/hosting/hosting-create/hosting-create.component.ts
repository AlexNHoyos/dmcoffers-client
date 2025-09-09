import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Hosting, HostingPublisher } from '../hosting.model';

import { HostingService } from '../hosting.service';
import { UserService } from 'src/app/services/user/user.service.js';
import { Publisher } from '../../publishers/publisher.model.js';
import { PublisherService } from '../../publishers/publisher.service.js';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-hosting-create',
  templateUrl: './hosting-create.component.html',
  standalone: false
})

export class HostingCreateComponent {
  hosting: Hosting = {
    id: 0,
    name: '',
    creationuser: '',
    creationtimestamp: new Date().toISOString(),
    status: true,
  };

  hostingPublisher: HostingPublisher = {
    id: 0,
    publisher: new Publisher(),
    hosting: new Hosting(),
    storageType: '',
    storageAmmount: 0,
    ramAmmount: 0,
    cpuSpecs: '',
    uptimePercentage: 0
  }
  publicadores: Publisher[] = [];
  storageTypes: string[] = ['SSD', 'HDD', 'SSHD', 'SSD + HHD'];
  storageAmmount: number[] = [2000, 1000, 500, 256, 128];
  ramAmmount: number[] = [64, 32, 16, 12, 8, 4, 2];

  constructor(
    private HostingService: HostingService,
    private dialogRef: MatDialogRef<HostingCreateComponent>,
    private userService: UserService,
    private publisherService: PublisherService
  ) {
    this.loadService();
  }
  ngOnInit(): void {

  }

  async loadService() {
    const username = await firstValueFrom(this.userService.getLoggedInUsername());
    if (username) {
      this.hosting.creationuser = username;
    }

    this.publicadores = await firstValueFrom(this.publisherService.getAllPublishers());
  }

  createHosting(): void {
    //Validacion de fechas
    const HostingToSend = {
      ...this.hosting,
      creationtimestamp: this.hosting.creationtimestamp
        ? new Date(this.hosting.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.hosting.modificationtimestamp
        ? new Date(this.hosting.modificationtimestamp).toISOString()
        : null,
    };

    this.HostingService.createHosting(HostingToSend).subscribe({
      next: (response) => {
        this.hostingPublisher.hosting = response

        this.hostingPublisher.publisher = { id: this.hostingPublisher.publisher.id } as Publisher;
        this.hostingPublisher.hosting = { id: this.hostingPublisher.hosting.id } as Hosting;

        this.HostingService.createHostingPublisher(this.hostingPublisher).subscribe({
          next: (response) => {
            this.dialogRef.close(true); // Cierra el diálogo y indica que se guardaron los cambios
          },
          error: (error) => {
            console.error('Error creando Hosting Publisher', error);
          },
        });

        this.dialogRef.close(true); // Cierra el diálogo y indica que se guardaron los cambios
      },
      error: (error) => {
        console.error('Error creando Hosting', error);
      },
    });


  }

  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }
}
