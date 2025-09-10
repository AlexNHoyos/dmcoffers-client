import { Component, OnInit } from '@angular/core';
import { Hosting, HostingPublisher } from './hosting.model';
import { HostingService } from './hosting.service';
import { HostingCreateComponent } from './hosting-create/hosting-create.component';
import { HostingUpdateComponent } from './hosting-update/hosting-update.component';
import { MatDialog } from '@angular/material/dialog';
import { HostingDeleteComponent } from './hosting-delete/hosting-delete.component';
import { HostingDetailComponent } from './hosting-detail/hosting-detail.component';
import { Publisher } from '../publishers/publisher.model.js';
import { PublisherService } from '../publishers/publisher.service.js';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.scss'],
  standalone: false
})
export class HostingComponent implements OnInit {
  hostingPublisher: HostingPublisher[] = [];
  filteredHostings: HostingPublisher[] = [];
  hostings: Hosting[] = [];
  publishers: Publisher[] = [];
  hostingsMap: { [key: number]: any } = {};
  publishersMap: { [key: number]: any } = {};

  filterPublicador: number | null = null;
  filterHosting: string = '';
  filterRam: number | null = null;
  filterTipoDisco: string = '';
  filterCapacidadDisco: number | null = null;
  filterCpu: string = '';

  storageTypes: string[] = ['SSD', 'HDD', 'SSHD', 'SSD + HHD'];
  storageAmmount: number[] = [2000, 1000, 500, 256, 128];
  ramAmmount: number[] = [64, 32, 16, 12, 8, 4, 2];


  constructor(
    private hostingService: HostingService,
    private dialog: MatDialog,
    private publisherService: PublisherService,
    private breakpointObserver: BreakpointObserver
  ) { }

  displayedColumns: string[] = ['id', 'publisher', 'hosting', 'espacioDisco', 'cantidadRam', 'cpuSpecs', 'actions'];

  ngOnInit(): void {
    this.loadHostings();
    this.setupResponsiveColumns();
  }

   private setupResponsiveColumns(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      if (result.matches) {
        // pantalla pequeña: oculto la columna 'user'
        this.displayedColumns = ['id', 'hosting' , 'actions'];
      } else {
        // pantalla grande: muestro todas
        this.displayedColumns = ['id', 'publisher', 'hosting', 'espacioDisco', 'cantidadRam', 'cpuSpecs', 'actions'];
      }
    });
  }

  getCreateComponent() {
    return HostingCreateComponent;
  }
  getEditComponent() {
    return HostingUpdateComponent;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(HostingCreateComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHostings(); // Carga o actualiza la lista de Hostings
      }
    });
  }

  showDetails(id: number): void {
    this.hostingService.getHosting(id).subscribe((hosting) => {
      const dialogRef = this.dialog.open(HostingDetailComponent, {
        width: '400px',
        disableClose: true,
        data: { hosting },
      });
    });
  }

  openEditDialog(id: number): void {
    this.hostingService.getHostingPublisher(id).subscribe((hostingPublisher) => {
      const dialogRef = this.dialog.open(HostingUpdateComponent, {
        width: '400px',
        disableClose: true,
        data: { hostingPublisher },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadHostings(); // Carga o actualiza la lista de Hostings
        }
      });
    });
  }

  openDeleteDialog(id: number, idHosting: number): void {
    const dialogRef = this.dialog.open(HostingDeleteComponent, {
      width: '400px',
      disableClose: true,
      data: { id, idHosting }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(this.filteredHostings)
        this.loadHostings(); // Carga o actualiza la lista de Hostings
      }
    });
  }

  loadHostings(): void {
    this.hostingService.getAllHostingPublishers().subscribe((data: HostingPublisher[]) => {
      this.hostingPublisher = data;
      this.filteredHostings = data;
    });
    this.hostingService.getAllHostings().subscribe((data) => {
      this.hostings = data;
      this.hostingsMap = Object.fromEntries(this.hostings.map(h => [h.id, h]));
    });
    this.publisherService.getAllPublishers().subscribe((data) => {
      this.publishers = data;
      this.publishersMap = Object.fromEntries(this.publishers.map(p => [p.id, p]));
    });
  }

  aplicarFiltro(): void {


    this.filteredHostings = this.hostingPublisher.filter((hostings: HostingPublisher) => {

      const coincidePublicador =
        !this.filterPublicador || hostings.publisher.id == this.filterPublicador;

      const coincideHosting =
        !this.filterHosting || this.hostingsMap[hostings.hosting.id]?.name.toLowerCase().includes(this.filterHosting.toLowerCase());

      const coincideRam =
        !this.filterRam || this.filterRam == hostings.ramAmmount;

      const coincideTipoDisco =
        !this.filterTipoDisco || this.filterTipoDisco == hostings.storageType;

      const coincideAlmacenamiento =
        !this.filterCapacidadDisco || this.filterCapacidadDisco == hostings.storageAmmount;

      const coincideCpu =
        !this.filterCpu || hostings.cpuSpecs.toLowerCase().includes(this.filterCpu.toLowerCase());

      return coincidePublicador && coincideHosting && coincideAlmacenamiento && coincideTipoDisco && coincideCpu && coincideRam;
    });
  }

  resetFiltro(): void {
    this.filterPublicador = null;
    this.filterHosting = '';
    this.filterTipoDisco = '';
    this.filterCapacidadDisco = null;
    this.filterRam = null;
    this.filteredHostings = [...this.hostingPublisher];
  }
}
