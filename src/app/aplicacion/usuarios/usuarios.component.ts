import { Component } from '@angular/core';

import { UserService } from 'src/app/services/user/user.service';
import { CrudComponent } from '../../components/crud/crud.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateRolComponent } from './update-rol/update-rol.component';
import { User } from 'src/app/models/user.model';
import { RegisterComponent } from 'src/app/auth/register/register.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent extends CrudComponent<User> {
  usuarios: User[] = [];

  constructor(private userService: UserService, override dialog: MatDialog) {
    super(userService, dialog);
  }

  getCreateComponent() {
    return RegisterComponent; //Eliminar esto
  }

  getEditComponent() {
    return UpdateRolComponent;
  }

  openEditDialog(id: number): void {
    this.userService.getUser(id).subscribe((user) => {
      const dialogRef = this.dialog.open(UpdateRolComponent, {
        width: '400px',
        data: { user },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('user actualizado');
          this.loadUsuarios(); // Carga o actualiza la lista de Usuarios
        }
      });
    });
  }

  override displayedColumns: string[] = ['id', 'user', 'actions'];

  showTable: boolean = false;
  buttonText: string = 'Mostrar Usuarios';

  toggleUsuarios() {
    if (this.showTable) {
      // Oculta la tabla
      this.showTable = false;
      this.buttonText = 'Mostrar Usuarios';
    } else {
      // Carga y muestra la tabla
      this.loadUsuarios();
      // Muestra la tabla
      this.showTable = true;
      this.buttonText = 'Ocultar Usuarios';
    }
  }

  override ngOnInit(): void {}

  loadUsuarios(): void {
    this.showTable = true;
    this.userService.getAllUsers().subscribe((data) => {
      this.usuarios = data;
    });
  }
}
