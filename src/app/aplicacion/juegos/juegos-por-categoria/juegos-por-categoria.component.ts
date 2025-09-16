import { Component, OnInit } from '@angular/core';
import { Juego } from '../juegos.model';
import { JuegoService } from '../juegos.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DesarrolladoresService } from '../../desarrolladores/desarrolladores.service';
import { PublisherService } from '../../publishers/publisher.service';
import { Desarrollador } from '../../desarrolladores/desarrolladores.models';
import { Publisher } from '../../publishers/publisher.model';

@Component({
  selector: 'app-juegos-por-categoria',
  templateUrl: './juegos-por-categoria.component.html',
  styleUrls: ['./juegos-por-categoria.component.scss'],
  standalone: false
})
export class JuegosPorCategoriaComponent implements OnInit {

  juegos: Juego[] = [];
  juegosFiltrados: Juego[] = [];
  categorias: string[] = [];
  desarrolladores: Desarrollador[] = [];
  publicadores: Publisher[] = [];
  environmentImg = environment.urlImg;
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

  constructor(private juegoService: JuegoService, private router: Router,
    private desarrolladoresService: DesarrolladoresService,
    private publisherService: PublisherService
  ) { }

  ngOnInit(): void {
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

  verDetalle(id: number): void {
    this.router.navigate(['/juego', id]);
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
