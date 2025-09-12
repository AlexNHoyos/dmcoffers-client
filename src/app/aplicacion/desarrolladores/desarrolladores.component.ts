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
  filteredDesarrolladores: Desarrollador[] = [];
  
    today: Date = new Date();
  
    //Filtros
    filterEstado: boolean | null = null;
    filterDesarrolladorName: string = '';
    filterFundacionDesde: Date | null = null;
    filterFundacionHasta: Date | null = null;
    filterDisolucionDesde: Date | null = null;
    filterDisolucionHasta: Date | null = null;

    filterDesde = (d: Date | null): boolean => {
      if (!d) return false;
      return !this.filterFundacionHasta || d <= this.filterFundacionHasta!;
    };

    filterHasta = (d: Date | null): boolean => {
      if (!d) return false;
      return !this.filterFundacionDesde || d >= this.filterFundacionDesde!;
    };

    filterDisolucionDesdeFn = (d: Date | null): boolean => {
      if (!d) return false;
      return !this.filterDisolucionHasta || d <= this.filterDisolucionHasta!;
    };

    filterDisolucionHastaFn = (d: Date | null): boolean => {
      if (!d) return false;
      return !this.filterDisolucionDesde || d >= this.filterDisolucionDesde!;
    };

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
        this.loadDesarrolladores(); // Carga o actualiza la lista de devlishers
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
            this.loadDesarrolladores(); // Carga o actualiza la lista de devlishers
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
        this.loadDesarrolladores(); // Carga o actualiza la lista de devlishers
      }
    });
  }

  loadDesarrolladores(): void {
    this.desarrolladoresService.getAllDesarrolladores().subscribe((data) => {
      this.desarrolladores = data;
      this.filteredDesarrolladores = [...data];
      console.log(data)
    });
  }


  aplicarFiltro(): void {
  // Validar rangos de fechas de fundación
  if (this.filterFundacionDesde && this.filterFundacionHasta && this.filterFundacionDesde > this.filterFundacionHasta) {
    alert('La fecha "Fundación desde" no puede ser mayor que la "Fundación hasta".');
    return;
  }

  // Validar rangos de fechas de disolución
  if (this.filterDisolucionDesde && this.filterDisolucionHasta && this.filterDisolucionDesde > this.filterDisolucionHasta) {
    alert('La fecha "Disolución desde" no puede ser mayor que la "Disolución hasta".');
    return;
  }

  this.filteredDesarrolladores = this.desarrolladores.filter((dev) => {
    const coincideNombre =
      !this.filterDesarrolladorName || dev.developername.toLowerCase().includes(this.filterDesarrolladorName.toLowerCase());

    const coincideEstado =
      !this.filterEstado || dev.status === this.filterEstado;

    const coincideFundacion =
      (!this.filterFundacionDesde || new Date(dev.foundation_date!) >= this.filterFundacionDesde) &&
      (!this.filterFundacionHasta || new Date(dev.foundation_date!) <= this.filterFundacionHasta);

    const coincideDisolucion =
      (!this.filterDisolucionDesde || (dev.dissolution_date && new Date(dev.dissolution_date) >= this.filterDisolucionDesde)) &&
      (!this.filterDisolucionHasta || (dev.dissolution_date && new Date(dev.dissolution_date) <= this.filterDisolucionHasta));

    return coincideNombre && coincideEstado && coincideFundacion && coincideDisolucion;
  });
}


// Resetear filtros
resetFiltro(): void {
  this.filterEstado = null;
  this.filterDesarrolladorName = '';
  this.filterFundacionDesde = null;
  this.filterFundacionHasta = null;
  this.filterDisolucionDesde = null;
  this.filterDisolucionHasta = null;

  this.filteredDesarrolladores = [...this.desarrolladores];
}
}
