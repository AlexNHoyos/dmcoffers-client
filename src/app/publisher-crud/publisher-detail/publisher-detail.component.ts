import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Publisher } from '../../models/publisher.model';
//import { ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { PublisherService } from 'src/app/services/publisher/publisher.service';

@Component({
  selector: 'app-publisher-detail',
  templateUrl: './publisher-detail.component.html',
  styleUrls: ['./publisher-detail.component.scss'],
})
export class PublisherDetailComponent implements OnInit {
  publisher: Publisher | null = null;
  searchId: string = '';
  errorMessage: string = '';

  constructor(
    //private route: ActivatedRoute,
    private publisherService: PublisherService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  getPublisher(): void {
    if (this.searchId) {
      this.publisherService.getPublisher(this.searchId).subscribe(
        (data) => {
          this.publisher = data;
          this.errorMessage = ''; //Limpia el error por pantalla
        },
        (error) => {
          this.openErrorDialog(error.message);
          this.publisher = null; // Limpia publisher si hay error
        }
      );
    }
  }

  openErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage },
    });
  }
}
