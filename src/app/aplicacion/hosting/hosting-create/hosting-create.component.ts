import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Hosting } from '../hosting.model';

import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { HostingService } from '../hosting.service';

@Component({
  selector: 'app-hosting-create',
  templateUrl: './hosting-create.component.html',
  styleUrls: ['./hosting-create.component.scss'],
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
  constructor(
    private HostingService: HostingService,
    private dialogRef: MatDialogRef<HostingCreateComponent>,
    private userUtilsService: UserUtilsService
  ) { }
  ngOnInit(): void {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.hosting.creationuser = username;
      }
    });
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

    if (!this.hosting.name || this.hosting.name.trim() === '') {
      console.error('El nombre del hosting no puede estar vacío');
      return;
    }

    this.HostingService.createHosting(HostingToSend).subscribe({
      next: (response) => {
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
