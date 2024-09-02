import { Component, OnInit } from '@angular/core';
import { Publisher } from './models/publisher.model';
import { PublisherService } from './services/publisher/publisher.service';

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
    //this.publisherService.getPublishers().subscribe((data) => {
    //this.publishers = data;
    //});
  }
}
