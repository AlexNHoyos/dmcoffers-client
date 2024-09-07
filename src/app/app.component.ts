import { Component, OnInit } from '@angular/core';
import { Publisher } from './aplicacion/publishers/publisher.model';
import { PublisherService } from './aplicacion/publishers/publisher.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  publishers: Publisher[] = [];
  title = 'dmcoffers-client';

  constructor(private publisherService: PublisherService) {}

  ngOnInit(): void {}
}
