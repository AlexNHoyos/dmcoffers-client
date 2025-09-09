import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateRolComponent } from './update-rol/update-rol.component';
import { User } from 'src/app/models/user.model';
import { RegisterComponent } from 'src/app/auth/register/register.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: false
})
export class UsuariosComponent implements OnInit {
  usuarios: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['id', 'user', 'actions'];

  ngOnInit(): void {
    this.loadUsuarios();
  }

  getEditComponent() {
    return UpdateRolComponent;
  }

  openEditDialog(id: number): void {
    this.userService.getUser(id).subscribe((user) => {
      const dialogRef = this.dialog.open(UpdateRolComponent, {
        width: '400px',
        disableClose: true,
        data: { user },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadUsuarios(); // Carga o actualiza la lista de Usuarios
        }
      });
    });
  }

  loadUsuarios(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.usuarios = data;
    });
  }
}
