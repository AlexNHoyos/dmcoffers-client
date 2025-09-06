import { Component, Type } from '@angular/core';
import { Publisher } from './publisher.model';
import { PublisherService } from './publisher.service';
import { CrudComponent } from '../../components/crud/crud.component';
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
export class PublisherComponent extends CrudComponent<Publisher> {
  publishers: Publisher[] = [];

  constructor(
    private publisherService: PublisherService,
    override dialog: MatDialog
  ) {
    super(publisherService, dialog);
    this.loadPublishers();
  }

  override displayedColumns: string[] = ['id', 'publishername', 'actions'];


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
      /*  No es necesario porque no edito los datos adentro del dialog, pero podria implementarse a futuro
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.loadPublishers(); // Carga o actualiza la lista de publishers
        }
      });*/
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


  override ngOnInit(): void {
    // Con esta funcion se puede cargar los publishers al inicio
    // this.loadPublishers();
    super.ngOnInit();
  }

  loadPublishers(): void {
    this.publisherService.getAllPublishers().subscribe((data) => {
      this.publishers = data;
    });
  }
}
