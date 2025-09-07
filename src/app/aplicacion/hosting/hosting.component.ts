import { Component, OnInit } from '@angular/core';
import { Hosting } from './hosting.model';
import { HostingService } from './hosting.service';
import { HostingCreateComponent } from './hosting-create/hosting-create.component';
import { HostingUpdateComponent } from './hosting-update/hosting-update.component';
import { MatDialog } from '@angular/material/dialog';
import { HostingDeleteComponent } from './hosting-delete/hosting-delete.component';
import { HostingDetailComponent } from './hosting-detail/hosting-detail.component';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styleUrls: ['./hosting.component.scss'],
  standalone: false
})
export class HostingComponent implements OnInit {
  hostings: Hosting[] = [];

  constructor(
    private hostingService: HostingService,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['id', 'name', 'actions'];

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
    this.hostingService.getHosting(id).subscribe((hosting) => {
      const dialogRef = this.dialog.open(HostingUpdateComponent, {
        width: '400px',
        disableClose: true,
        data: { hosting },
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
    this.hostingService.getAllHostings().subscribe((data) => {
      this.hostings = data;
    });
  }
}
