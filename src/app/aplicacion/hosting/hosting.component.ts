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

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.scss'],
  standalone: false
})
export class HostingComponent implements OnInit {
  hostingPublisher: HostingPublisher[] = [];
  hostings: Hosting[] = [];
  publishers: Publisher[] = [];
  hostingsMap: { [key: number]: any } = {};
  publishersMap: { [key: number]: any } = {};

  constructor(
    private hostingService: HostingService,
    private dialog: MatDialog,
    private publisherService: PublisherService,
  ) { }

  displayedColumns: string[] = ['id', 'publisher', 'hosting', 'espacioDisco', 'cantidadRam', 'cpuSpecs', 'actions'];

  ngOnInit(): void {
    this.loadHostings();
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

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(HostingDeleteComponent, {
      width: '400px',
      disableClose: true,
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadHostings(); // Carga o actualiza la lista de Hostings
      }
    });
  }

  loadHostings(): void {
    this.hostingService.getAllHostingPublishers().subscribe((data) => {
      this.hostingPublisher = data;
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
}
