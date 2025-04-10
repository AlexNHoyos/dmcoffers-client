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

    if (this.data.rolDesc) {
      this.user.rolDesc = this.data.user.rolDesc;
    }
  }

  onUpdateUser() {
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.user.modificationuser = username;
        this.user.modificationtimestamp = new Date().toISOString();

        // Actualiza el objeto del usuario con el rol actualizado
        const updatedUser: User = {
          ...this.user,
          rolDesc: this.user.rolDesc, // Cambia solo el campo de rol
        };

        this.userService.updateUser(this.user.id, updatedUser).subscribe(
          (response) => {
            console.log('Usuario actualizado:', response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);
          }
        );
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
