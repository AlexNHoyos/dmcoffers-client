import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolApl } from 'src/app/models/rol.models.js';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-rol',
  templateUrl: './update-rol.component.html',
  styleUrls: ['./update-rol.component.scss'],
  standalone: false
})

export class UpdateRolComponent {
  user: User;
  userRoles: number[] = [];
  allRoles: RolApl[] | undefined;
  selectedRoles: SelectedRoles[] = [];
  rolesSeleccionados: SelectedRoles[] = [];

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UpdateRolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User; rolDesc: string }
  ) {
    this.user = { ...data.user, id: data.user.idUser };
  }

  async ngOnInit() {

    await this.getAllRoles();
    await this.loadUserRols();
    this.rolesSeleccionados = this.selectedRoles.filter(r => r.rolSelected);

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
    this.userService.getLoggedInUsername().subscribe((username) => {
      if (username) {
        this.user.modificationuser = username;
        this.user.modificationtimestamp = new Date().toISOString();

        // Convertir los roles seleccionados a IDs si es necesario
        let roleIds: number[] = [];

        this.rolesSeleccionados.forEach(rs => {
          if (rs.rol?.id != undefined && !rs.rolSelected) {
            roleIds.push(rs.rol.id);
          }
        })

        this.userService.updateUserRoles(this.user.idUser, roleIds).subscribe(
          (response) => {
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error al actualizar roles de usuario:', error);
          }
        );

      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}

class SelectedRoles {
  rol: RolApl | undefined;
  rolSelected: boolean = false;
}
