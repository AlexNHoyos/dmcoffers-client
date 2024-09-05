import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { CrudService } from 'src/app/components/crud/crud.service';
import { environment } from 'src/environments/environment';
import { Publisher, PublisherPage } from './publisher.model';
import { Page } from 'src/app/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class PublisherService extends CrudService<PublisherPage> {
  override endpoint = `${environment.urlApi}/publishers`;

  constructor(protected override http: HttpClient) {
    super(http);
  }
}
