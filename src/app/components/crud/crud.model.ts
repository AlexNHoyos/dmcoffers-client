import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, of, merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import { CrudService, SearchService } from './crud.service';
import { Page } from 'src/app/models/pagination';
import { DataSource } from '@angular/cdk/collections/index';

export interface ICRUDComponent {
  onView(row: any): void;
  onCreate(): void;
  onEdit(row: any): void;
  onDelete(row: any): void;
  search(): void;
  reloadTable(): void;
}

export interface ISearchComponent {
  search(): void;
  reloadTable(): void;
}

export interface SearchDTO {}

export class FilterDTO {
  q: string = '';
}

export interface DTO {}

export interface Data {
  isReadOnly: boolean;
  id: number;
}

export interface IDataSource {
  resultsLength: number;
  isLoadingResults: boolean;
  isRateLimitReached: boolean;
}

export abstract class DataSourceExtended<T>
  extends DataSource<T>
  implements IDataSource
{
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
}

export abstract class PersonaDataSourceExtended<T>
  extends DataSource<T>
  implements IDataSource
{
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  backendError = false;
  backendErrorMessage: string = '';
}

export class CrudDataSource<
  T,
  TPage extends Page<T>
> extends DataSourceExtended<T> {
  override resultsLength = 0;
  override isLoadingResults = true;
  override isRateLimitReached = false;

  constructor(
    private service: CrudService<TPage>,
    private paginator: MatPaginator,
    private sort: MatSort,
    private filter: FilterDTO,
    private size?: number
  ) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<T[]> {
    const displayDataChanges = [this.sort.sortChange, this.paginator.page];

    // Para que al modificar un filtro y realizar un búsqueda, siempre nos lleve a la primer página
    this.paginator.pageIndex = 0;

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    return merge(...displayDataChanges).pipe(
      startWith(null),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.service.search(
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.filter,
          this.size
        );
      }),
      map((data: any) => {
        // Especifica el tipo correcto para `data`
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.totalElements;

        return data.content;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return of([]); // Usa `of` en lugar de `Observable.of`
      })
    );
  }

  disconnect() {}
}

export class SearchDataSource<
  T,
  TPage extends Page<T>
> extends DataSourceExtended<T> {
  override resultsLength = 0;
  override isLoadingResults = true;
  override isRateLimitReached = false;

  constructor(
    private service: SearchService<TPage>,
    private paginator: MatPaginator,
    private sort: MatSort,
    private filter: FilterDTO,
    private size?: number
  ) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<T[]> {
    const displayDataChanges = [this.sort.sortChange, this.paginator.page];

    // Para que al modificar un filtro y realizar un búsqueda, siempre nos lleve a la primer página
    this.paginator.pageIndex = 0;

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    return merge(...displayDataChanges).pipe(
      startWith(null),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.service.search(
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.filter,
          this.size
        );
      }),
      map((data: any) => {
        // Especifica el tipo correcto para `data`
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.totalElements;

        return data.content;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return of([]); // Usa `of` en lugar de `Observable.of`
      })
    );
  }

  disconnect() {}
}

export class SearchCustomDataSource<
  T,
  TPage extends Page<T>
> extends DataSourceExtended<T> {
  override resultsLength = 0;
  override isLoadingResults = true;
  override isRateLimitReached = false;

  constructor(
    private service: SearchService<TPage>,
    private paginator: MatPaginator,
    private sort: MatSort,
    private filter: FilterDTO,
    private size?: number
  ) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<T[]> {
    const displayDataChanges = [this.sort.sortChange, this.paginator.page];

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    return merge(...displayDataChanges).pipe(
      startWith(null),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.service.search(
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.filter,
          this.size
        );
      }),
      map((data: any) => {
        // Especifica el tipo correcto para `data`
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.totalElements;

        return data.content;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return of([]); // Usa `of` en lugar de `Observable.of`
      })
    );
  }

  disconnect() {}
}
