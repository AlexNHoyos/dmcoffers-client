import { Component, OnInit } from '@angular/core';
import { PublisherService, Publisher } from './publisher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
//export class AppComponent {
//
//}
export class AppComponent implements OnInit {
  publishers: Publisher[] = [];
  title = 'dmcoffers-client';

  constructor(private publisherService: PublisherService) {}

  ngOnInit(): void {
    this.publisherService.getPublishers().subscribe((data) => {
      this.publishers = data;
    });
  }
}
