import { Component, OnInit} from '@angular/core';
import { Publisher } from './publisher.model';
import { PublisherService } from './publisher.service';
import { PublisherCreateComponent } from './publisher-create/publisher-create.component';
import { PublisherUpdateComponent } from './publisher-update/publisher-update.component';
import { MatDialog } from '@angular/material/dialog';
import { PublisherDeleteComponent } from './publisher-delete/publisher-delete.component';
import { PublisherDetailComponent } from './publisher-detail/publisher-detail.component';
@Component({
  selector: 'app-publisher',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss'],
  standalone: false
})
export class PublisherComponent implements OnInit {
  publishers: Publisher[] = [];
  filteredPublishers: Publisher[] = [];

  today: Date = new Date();

  //Filtros
  filterEstado: boolean | null = null;
  filterPublisherName: string = '';
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
    private publisherService: PublisherService,
    private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.loadPublishers();
  }

  displayedColumns: string[] = ['id', 'publishername', 'actions'];


  getCreateComponent() {
    return PublisherCreateComponent;
  }
  getEditComponent() {
    return PublisherUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PublisherCreateComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPublishers(); // Carga o actualiza la lista de publishers
      }
    });
  }

  showDetails(id: number): void {
    this.publisherService.getPublisher(id).subscribe((publisher) => {
      const dialogRef = this.dialog.open(PublisherDetailComponent, {
        width: '400px',
        disableClose: true,
        data: { publisher },
      });
    });
  }

  openEditDialog(id: number): void {
    this.publisherService.getPublisher(id).subscribe((publisher) => {
      const dialogRef = this.dialog.open(PublisherUpdateComponent, {
        width: '400px',
        disableClose: true,
        data: { publisher },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadPublishers(); // Carga o actualiza la lista de publishers
        }
      });
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(PublisherDeleteComponent, {
      width: '400px',
      disableClose: true,
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPublishers(); // Carga o actualiza la lista de publishers
      }
    });
  }

  loadPublishers(): void {
    this.publisherService.getAllPublishers().subscribe((data) => {
      this.publishers = data;
      this.filteredPublishers = [...data];
    });
  }

  aplicarFiltro(): void {
    console.log('Valor del filtro de estado:', this.filterEstado, typeof this.filterEstado);
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

  this.filteredPublishers = this.publishers.filter((pub) => {
    const coincideNombre =
      !this.filterPublisherName || pub.publishername.toLowerCase().includes(this.filterPublisherName.toLowerCase());

    const coincideEstado =
       this.filterEstado === null || pub.status === this.filterEstado;

    const coincideFundacion =
      (!this.filterFundacionDesde || new Date(pub.foundation_date!) >= this.filterFundacionDesde) &&
      (!this.filterFundacionHasta || new Date(pub.foundation_date!) <= this.filterFundacionHasta);

    const coincideDisolucion =
      (!this.filterDisolucionDesde || (pub.dissolution_date && new Date(pub.dissolution_date) >= this.filterDisolucionDesde)) &&
      (!this.filterDisolucionHasta || (pub.dissolution_date && new Date(pub.dissolution_date) <= this.filterDisolucionHasta));

    return coincideNombre && coincideEstado && coincideFundacion && coincideDisolucion;
  });
}


// Resetear filtros
resetFiltro(): void {
  this.filterEstado = null;
  this.filterPublisherName = '';
  this.filterFundacionDesde = null;
  this.filterFundacionHasta = null;
  this.filterDisolucionDesde = null;
  this.filterDisolucionHasta = null;

  this.filteredPublishers = [...this.publishers];
}

}
