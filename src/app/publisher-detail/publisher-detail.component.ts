import { Component, OnInit } from '@angular/core';
import { Publisher } from '../models/publisher.model';
//import { ActivatedRoute } from '@angular/router';
import { PublisherService } from '../publisher.service';

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
    private publisherService: PublisherService
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
          this.errorMessage = error; // Asigna el mensaje de error
          this.publisher = null; // Resetea los datos del publisher si hay un error
        }
      );
    }
  }
}
