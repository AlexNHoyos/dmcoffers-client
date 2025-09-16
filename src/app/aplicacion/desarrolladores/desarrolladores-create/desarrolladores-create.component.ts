import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Desarrollador } from '../desarrolladores.models';

import { DesarrolladoresService } from '../desarrolladores.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-desarrolladores-create',
  templateUrl: './desarrolladores-create.component.html',
  styleUrls: ['./desarrolladores-create.component.scss'],
  standalone: false
})
export class DesarrolladoresCreateComponent {
  today: Date = new Date();
  desarrollador: Desarrollador = {
    id: 0,
    developername: '',
    foundation_date: null,
    dissolution_date: null,
    status: true,
    creationtimestamp: new Date().toISOString(),
    creationuser: '',
    modificationtimestamp: null,
    modificationuser: null,
  };
  constructor(
    private desarrolladoresService: DesarrolladoresService,
    private dialogRef: MatDialogRef<DesarrolladoresCreateComponent>,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    this.userService.getLoggedInUsername().subscribe((username) => {
      if (username) {
        this.desarrollador.creationuser = username;
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

    this.desarrolladoresService
      .createDesarrollador(desarrolladorToSend)
      .subscribe({
        next: (response) => {
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

  onDateInput(event: any) {
    let value: string = event.target.value.replace(/\D/g, ''); // solo números
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    event.target.value = value;
  }

}
