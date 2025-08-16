import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { RolApl } from 'src/app/models/rol.models.js';
import { User } from 'src/app/models/user.model';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-rol',
  templateUrl: './update-rol.component.html',
  styleUrls: ['./update-rol.component.scss'],
})

export class UpdateRolComponent {
  user: User;
  userRoles: number[] = [];
  allRoles: RolApl[] | undefined;
  selectedRoles: SelectedRoles[] = [];

  constructor(
    private userService: UserService,
    private userUtilsService: UserUtilsService,
    public dialogRef: MatDialogRef<UpdateRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User; rolDesc: string }
  ) {
    this.user = { ...data.user, id: data.user.idUser };
  }

  async ngOnInit() {

    await this.getAllRoles();
    await this.loadUserRols();


    console.log(this.userRoles);
    console.log(this.allRoles);
    console.log(this.selectedRoles);
  }

  async loadUserRols() {
    try {
      const roles = await this.userService.getAllUserRoles(this.user.idUser).toPromise();
      if (roles != undefined) {
        roles.forEach(rol => {
          this.selectedRoles.forEach(selectedRol => {
            if (selectedRol.rol?.id === rol) {
              this.selectedRoles[this.selectedRoles.indexOf(selectedRol)].rolSelected = true;
            }
          })
        });
      }
    } catch (err) {
      console.error('Error cargando roles:', err);
      this.userRoles = [];
    }
  }

  async getAllRoles() {
    try {
      const roles: RolApl[] | undefined = await this.userService.getRoles().toPromise();
      if (roles != undefined) {
        roles.forEach(rol => {
          let newSelectedRol: SelectedRoles = new SelectedRoles();
          this.selectedRoles.push(newSelectedRol);
          let newRolIndex = this.selectedRoles.length - 1;
          this.selectedRoles[newRolIndex].rol = rol;
        });
      }

    } catch (err) {
      console.error('Error cargando roles:', err);
    }
  }

  onUpdateUser() {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      /*       if (username) {
              this.user.modificationuser = username;
              this.user.modificationtimestamp = new Date().toISOString();
      
              // Convertir los roles seleccionados a IDs si es necesario
              const roleIds = this.selectedRoles.map(r => this.mapRolNameToId(r));
              console.log('roles seleccionados:', this.selectedRoles);
              console.log('IDs a enviar:', roleIds);
      
              this.userService.updateUserRoles(this.user.idUser, roleIds).subscribe(
                (response) => {
                  console.log('Roles actualizados', response);
                  this.dialogRef.close(true);
                },
                (error) => {
                  console.error('Error al actualizar roles de usuario:', error);
                }
              );
            } */
    });
  }

  mapRolNameToId(roleName: string): number {
    const rolesMap: { [key: string]: number } = {
      admin: 1,
      moderador: 2,
      usuarioForo: 3,
      usuarioTienda: 4,
    };
    return rolesMap[roleName] || 0;
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

class SelectedRoles {
  rol: RolApl | undefined;
  rolSelected: boolean = false;
}