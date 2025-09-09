import { Component, OnInit } from '@angular/core';
import { Desarrollador } from './desarrolladores.models';
import { DesarrolladoresService } from './desarrolladores.service';
import { DesarrolladoresCreateComponent } from './desarrolladores-create/desarrolladores-create.component';
import { DesarrolladoresUpdateComponent } from './desarrolladores-update/desarrolladores-update.component';
import { MatDialog } from '@angular/material/dialog';
import { DesarrolladoresDeleteComponent } from './desarrolladores-delete/desarrolladores-delete.component';
import { DesarrolladoresDetailComponent } from './desarrolladores-detail/desarrolladores-detail.component';

@Component({
  selector: 'app-desarrolladores',
  templateUrl: './desarrolladores.component.html',
  styleUrls: ['./desarrolladores.component.scss'],
  standalone: false
})
export class DesarrolladoresComponent implements OnInit {
  desarrolladores: Desarrollador[] = [];

  constructor(
    private desarrolladoresService: DesarrolladoresService,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['id', 'developername', 'actions'];

  ngOnInit(): void {
    this.loadDesarrolladores();
  }

  getCreateComponent() {
    return DesarrolladoresCreateComponent;
  }
  getEditComponent() {
    return DesarrolladoresUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DesarrolladoresCreateComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDesarrolladores(); // Carga o actualiza la lista de publishers
      }
    });
  }

  showDetails(id: number): void {
    this.desarrolladoresService
      .getDesarrollador(id)
      .subscribe((desarrollador) => {
        const dialogRef = this.dialog.open(DesarrolladoresDetailComponent, {
          width: '400px',
          disableClose: true,
          data: { desarrollador },
        });
      });
  }

  openEditDialog(id: number): void {
    this.desarrolladoresService
      .getDesarrollador(id)
      .subscribe((desarrollador) => {
        const dialogRef = this.dialog.open(DesarrolladoresUpdateComponent, {
          width: '400px',
          disableClose: true,
          data: { desarrollador },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.loadDesarrolladores(); // Carga o actualiza la lista de publishers
          }
        });
      });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DesarrolladoresDeleteComponent, {
      width: '400px',
      disableClose: true,
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDesarrolladores(); // Carga o actualiza la lista de publishers
      }
    });
  }

  loadDesarrolladores(): void {
    this.desarrolladoresService.getAllDesarrolladores().subscribe((data) => {
      this.desarrolladores = data;
    });
  }
}
