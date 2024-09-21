import { Component, OnInit } from '@angular/core';
import { Publisher } from './aplicacion/publishers/publisher.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  publishers: Publisher[] = [];
  title = 'dmcoffers-client';

  constructor() {}

  ngOnInit(): void {}
}
