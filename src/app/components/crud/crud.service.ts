import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { FilterDTO } from '../../components/crud/crud.model';
import { ITEMS_PER_PAGE, SEARCH_PARAM_PATH } from '../constants/constants';

export interface Service {
  search(
    sort: string,
    order: string,
    page: number,
    filter: FilterDTO
  ): Observable<any>;
  endpoint: string;
}

@Injectable()
export abstract class SearchService<T> implements Service {
  endpoint: string = '';

  constructor(protected http: HttpClient) {}

  requestAll(reqParams: string): Observable<T> {
    return this.http.get<T>(this.endpoint + reqParams);
  }

  getAll(sort: string, order: string, page: number): Observable<T> {
    const requestUrl = `?sort=${sort},${order}&page=${
      page + 1
    }&size=${ITEMS_PER_PAGE}`;
    return this.requestAll(requestUrl);
  }

  search(
    sort: string,
    order: string,
    page: number,
    filter: FilterDTO,
    itemsPerPage?: number
  ): Observable<T> {
    let requestUrl = '';

    let size = ITEMS_PER_PAGE;
    if (itemsPerPage) {
      size = itemsPerPage;
    }

    if (filter) {
      let filterEncoded = encodeURI(JSON.stringify(filter));
      requestUrl = `/${SEARCH_PARAM_PATH}?filter=${filterEncoded}&sort=${sort},${order}&page=${
        page + 1
      }&size=${size}`;
    } else {
      requestUrl = `/${SEARCH_PARAM_PATH}?sort=${sort},${order}&page=${
        page + 1
      }&size=${size}`;
    }
    return this.requestAll(requestUrl);
  }
}

@Injectable()
export abstract class CrudService<T> extends SearchService<T> {
  delete(id: string): Observable<any> {
    return this.http.delete(this.endpoint + '/' + id, { responseType: 'text' });
  }
}
