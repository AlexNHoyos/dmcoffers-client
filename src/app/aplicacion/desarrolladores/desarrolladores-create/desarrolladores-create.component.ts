import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Desarrollador } from '../desarrolladores.models';

import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { DesarrolladoresService } from '../desarrolladores.service';

@Component({
  selector: 'app-desarrolladores-create',
  templateUrl: './desarrolladores-create.component.html',
  styleUrls: ['./desarrolladores-create.component.scss'],
})
export class DesarrolladoresCreateComponent {
  desarrollador: Desarrollador = {
    id: 0,
    developername: '',
    foundation_date: new Date().toISOString(),
    dissolution_date: new Date().toISOString(),
    status: '',
    creationtimestamp: new Date().toISOString(),
    creationuser: '',
    modificationtimestamp: '',
    modificationuser: '',
  };
  constructor(
    private desarrolladoresService: DesarrolladoresService,
    private dialogRef: MatDialogRef<DesarrolladoresCreateComponent>,
    private userUtilsService: UserUtilsService
  ) {}
  ngOnInit(): void {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.desarrollador.creationuser = username;
      } else {
        console.log('No userId found');
      }
    });
  }

  createDesarrollador(): void {
    //Validacion de fechas
    const desarrolladorToSend = {
      ...this.desarrollador,
      foundation_date: this.desarrollador.foundation_date
        ? new Date(this.desarrollador.foundation_date).toISOString()
        : null,
      dissolution_date: this.desarrollador.dissolution_date
        ? new Date(this.desarrollador.dissolution_date).toISOString()
        : null,
      creationtimestamp: this.desarrollador.creationtimestamp
        ? new Date(this.desarrollador.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.desarrollador.modificationtimestamp
        ? new Date(this.desarrollador.modificationtimestamp).toISOString()
        : null,
    };

    console.log(desarrolladorToSend);
    this.desarrolladoresService
      .createDesarrollador(desarrolladorToSend)
      .subscribe({
        next: (response) => {
          console.log('Desarrollador creado exitosamente', response);
          this.dialogRef.close(true); // Cierra el diálogo y indica que se guardaron los cambios
        },
        error: (error) => {
          console.error('Error creando desarrollador', error);
        },
      });
  }
  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }
}
