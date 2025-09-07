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
    });
  }
}
