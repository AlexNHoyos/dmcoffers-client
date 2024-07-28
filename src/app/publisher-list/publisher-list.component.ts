import { Component, OnInit } from '@angular/core';
import { PublisherService, Publisher } from '../publisher.service';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css'],
})
export class PublisherListComponent implements OnInit {
  publishers: Publisher[] = [];

  constructor(private publisherService: PublisherService) {}

  ngOnInit(): void {
    // Cargar los publishers al inicio si lo deseas
    // this.loadPublishers();
  }

  loadPublishers(): void {
    this.publisherService.getPublishers().subscribe((data) => {
      this.publishers = data;
    });
  }
}
