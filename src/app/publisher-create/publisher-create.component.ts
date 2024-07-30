import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PublisherService } from '../publisher.service';
import { Publisher } from '../models/publisher.model';

@Component({
  selector: 'app-publisher-create',
  templateUrl: './publisher-create.component.html',
  styleUrls: ['./publisher-create.component.scss'],
})
export class PublisherCreateComponent {
  publisher: Publisher = {
    id: '',
    publishername: '',
    foundation_date: new Date(), // Establecer una fecha por defecto si es necesario
    dissolution_date: null,
    status: '',
    creationtimestamp: new Date().toISOString(),
    creationuser: '',
    modificationtimestamp: null,
    modificationuser: '',
  };

  constructor(
    private publisherService: PublisherService,
    private router: Router
  ) {}

  createPublisher(): void {
    this.publisherService.createPublisher(this.publisher).subscribe(
      (response) => {
        console.log('Publisher created successfully', response);
        this.router.navigate(['/publishers']); // Navegar a la lista de publishers u otra vista
      },
      (error) => {
        console.error('Error creating publisher', error);
      }
    );
  }
}
