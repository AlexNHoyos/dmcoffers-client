import { Component, OnInit, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Juego } from '../juegos.model';
import { JuegoService } from '../juegos.service';
import { JuegoCreateComponent } from './juego-create/juego-create.component';
import { JuegoUpdateComponent } from './juego-update/juego-update.component';
import { JuegoDeleteComponent } from './juego-delete/juego-delete.component';
import { JuegoDetailDialogComponent } from './juego-detail-dialog/juego-detail-dialog.component';

@Component({
  selector: 'app-juegos-crud',
  templateUrl: './juegos-crud.component.html',
  styleUrls: ['./juegos-crud.component.scss'],
  standalone: false
})
export class JuegosCrudComponent implements OnInit{
  juegos: Juego[] = [];
  constructor(private juegoService: JuegoService, private dialog: MatDialog) {
  }

  displayedColumns: string[] = ['id', 'gamename', 'actions'];

  ngOnInit(): void {
    this.loadJuegos();
  }

  getCreateComponent() {
    return JuegoCreateComponent;
  }
  getEditComponent() {
    return JuegoUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(JuegoCreateComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadJuegos(); // Carga o actualiza la lista de juegos
      }
    });
  }

  showDetails(id: number): void {
    this.juegoService.getJuego(id).subscribe((juego) => {
      const dialogRef = this.dialog.open(JuegoDetailDialogComponent, {
        width: '400px',
        disableClose: true,
        data: { juego },
      });
    });
  }

  openEditDialog(id: number): void {
    this.juegoService.getJuego(id).subscribe((juego) => {
      const dialogRef = this.dialog.open(JuegoUpdateComponent, {
        width: '400px',
        disableClose: true,
        data: { juego },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadJuegos(); // Carga o actualiza la lista de juegos
        }
      });
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(JuegoDeleteComponent, {
      width: '400px',
      disableClose: true,
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadJuegos(); // Carga o actualiza la lista de juegos
      }
    });
  }

  loadJuegos(): void {
    this.juegoService.getJuegos().subscribe((data) => {
      this.juegos = data;
    });
  }
}
