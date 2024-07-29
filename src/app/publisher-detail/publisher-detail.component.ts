import { Component, OnInit } from '@angular/core';
import { Publisher } from '../publisher.service.js';
import { ActivatedRoute } from '@angular/router';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher-detail',
  templateUrl: './publisher-detail.component.html',
  styleUrls: ['./publisher-detail.component.scss'],
})
export class PublisherDetailComponent implements OnInit {
  publisher: Publisher | null = null;
  searchId: string = '';

  constructor(
    private route: ActivatedRoute,
    private publisherService: PublisherService
  ) {}

  ngOnInit(): void {}

  getPublisher(): void {
    if (this.searchId) {
      this.publisherService.getPublisher(this.searchId).subscribe(
        (data) => {
          this.publisher = data;
        },
        (error) => {
          console.error('Error fetching publisher', error);
          this.publisher = null;
        }
      );
    }
  }
}
