import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-rol',
  templateUrl: './update-rol.component.html',
  styleUrls: ['./update-rol.component.scss'],
})
export class UpdateRolComponent {
  roles: string[] = ['admin', 'moderador', 'usuarioForo', 'usuarioTienda'];
  user: User;
  selectedRoles: string[] = []; 

  constructor(
    private userService: UserService,
    private userUtilsService: UserUtilsService,
    public dialogRef: MatDialogRef<UpdateRolComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { user: User; rolDesc: string }
  ) {
    this.user = {
      ...data.user,
      id: data.user.idUser,
    };

    if (this.user.rolDescription) {
      this.selectedRoles = [this.user.rolDescription]; // inicializa si venís de uno solo
    } else if (this.user.roles) {
      this.selectedRoles = this.user.roles; // si ya viniera con varios
    }
  }

  onUpdateUser() {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
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
      }
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
