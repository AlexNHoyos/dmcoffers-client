import { Component, OnInit, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Juego } from '../juegos.model';
import { JuegoService } from '../juegos.service';
import { JuegoCreateComponent } from './juego-create/juego-create.component';
import { JuegoUpdateComponent } from './juego-update/juego-update.component';
import { JuegoDeleteComponent } from './juego-delete/juego-delete.component';
import { JuegoDetailDialogComponent } from './juego-detail-dialog/juego-detail-dialog.component';
import { Publisher } from '../../publishers/publisher.model';
import { Desarrollador } from '../../desarrolladores/desarrolladores.models';
import { PublisherService } from '../../publishers/publisher.service';
import { DesarrolladoresService } from '../../desarrolladores/desarrolladores.service';

@Component({
  selector: 'app-juegos-crud',
  templateUrl: './juegos-crud.component.html',
  styleUrls: ['./juegos-crud.component.scss'],
  standalone: false
})
export class JuegosCrudComponent implements OnInit{
  juegos: Juego[] = [];
  juegosFiltrados: Juego[] = [];
  categorias: string[] = [];
  desarrolladores: Desarrollador[] = [];
  publicadores: Publisher[] = [];
  today: Date = new Date();

  // filtros
  filterCategorias: string[] = [];
  filterFechaDesde: Date | null = null;
  filterFechaHasta: Date | null = null;
  filterDesarrollador: string = '';
  filterPublicador: string = '';
  filterPrecio = { start: 0, end: 100 };

  filterDesde = (d: Date | null): boolean => {
      if (!d) return false;
      return !this.filterFechaHasta || d <= this.filterFechaHasta!; 
    };

  filterHasta = (d: Date | null): boolean => {
      if (!d) return false;
      return !this.filterFechaDesde || d >= this.filterFechaDesde!;
    };

  constructor(private juegoService: JuegoService, private dialog: MatDialog, 
    private desarrolladoresService: DesarrolladoresService,
    private publisherService: PublisherService) {
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
      this.juegosFiltrados = [...data]; // por defecto todos
      this.categorias = [...new Set(data.flatMap((j) => j.categoriasNames))];
    });

    this.loadDropdownData();
  }

  loadDropdownData(): void {
    // Cargar todos los desarrolladores
    this.desarrolladoresService.getAllDesarrolladores().subscribe((data) => {
      this.desarrolladores = data;
    });

    // Cargar todos los publishers
    this.publisherService.getAllPublishers().subscribe((data) => {
      this.publicadores = data;
    });
  }

  aplicarFiltro(): void {
    if (this.filterFechaDesde && this.filterFechaHasta && this.filterFechaDesde > this.filterFechaHasta) {
      alert('La fecha "desde" no puede ser mayor que la fecha "hasta".');
      return;
    }

    this.juegosFiltrados = this.juegos.filter((juego) => {
      const coincideCategoria =
        this.filterCategorias.length === 0 ||
        this.filterCategorias.some(cat => juego.categoriasNames.includes(cat));

      const coincidePrecio =
      (!this.filterPrecio.start || juego.price! >= this.filterPrecio.start) &&
      (!this.filterPrecio.end || juego.price! <= this.filterPrecio.end);

      const coincideFecha =
        (!this.filterFechaDesde || new Date(juego.release_date!) >= this.filterFechaDesde) &&
        (!this.filterFechaHasta || new Date(juego.release_date!) <= this.filterFechaHasta);

      const coincideDesarrollador =
        !this.filterDesarrollador || juego.developerName.includes(this.filterDesarrollador);

      const coincidePublicador =
        !this.filterPublicador || juego.publisherName.includes(this.filterPublicador);

      return coincideCategoria && coincidePrecio && coincideFecha && coincideDesarrollador && coincidePublicador;
    });
  }

  resetFiltro(): void {
    this.filterCategorias = [];
    this.filterFechaDesde = null;
    this.filterFechaHasta = null;
    this.filterDesarrollador = '';
    this.filterPublicador = '';
    this.juegosFiltrados = [...this.juegos];
    this.filterPrecio = { start: 0, end: 100 };
  }

}
