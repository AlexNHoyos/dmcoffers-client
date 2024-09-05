import {
  Component,
  OnInit,
  Type,
  ViewChild,
  Inject,
  OnDestroy,
  Directive,
} from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Page } from 'src/app/models/pagination';
import { DataSource } from '@angular/cdk/collections';

import { CrudService } from './crud.service';
import { AlertService } from '../alert/alert.service';
import { LocatorService } from 'src/app/services/locator.service';
import {
  CrudDataSource,
  DataSourceExtended,
  DTO,
  FilterDTO,
  ICRUDComponent,
} from './crud.model';
import { Data } from '@angular/router';
import { ITEMS_PER_PAGE } from '../constants/constants';
import { ConfirmComponent } from '../confirm/confirm.component';
@Directive()
export abstract class CrudComponent<T>
  implements ICRUDComponent, OnInit, OnDestroy
{
  displayedColumns: any;
  filter: FilterDTO = new FilterDTO();
  alertService: AlertService;
  dataSource: DataSourceExtended<DTO> | null = null;
  itemsPerPage: number = ITEMS_PER_PAGE;

  abstract getEditComponent(): Type<DialogComponent<Data, boolean>>;
  abstract getCreateComponent(): Type<DialogComponent<Data, boolean>>;

  // Necesario para el componente md table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    protected service: CrudService<Page<DTO>>,
    protected dialogService: DialogService
  ) {
    this.alertService = LocatorService.getInstance(AlertService);
  }

  ngOnInit() {
    this.dataSource = new CrudDataSource(
      this.service!,
      this.paginator,
      this.sort,
      this.filter,
      this.itemsPerPage
    );
  }

  ngOnDestroy(): void {
    try {
      if (this.dialogService) this.dialogService.removeAll();
    } catch (e) {}
  }

  onView(row: any) {
    let disposable = this.dialogService
      .addDialog(
        this.getEditComponent(),
        {
          isReadOnly: true,
          id: row.id,
        },
        { closeByClickingOutside: false }
      )
      .subscribe((isSaved) => {
        if (isSaved) {
          this.reloadTable();
        }
      });
  }

  onEdit(row: any) {
    let disposable = this.dialogService
      .addDialog(this.getEditComponent(), {
        isReadOnly: false,
        id: row.id,
      })
      .subscribe((isSaved) => {
        if (isSaved) {
          this.reloadTable();
          this.alertService.success('Actualizado exitosamente.');
        }
      });
  }

  onCreate() {
    let disposable = this.dialogService
      .addDialog(this.getCreateComponent(), {})
      .subscribe((isSaved) => {
        if (isSaved) {
          this.reloadTable();
          this.alertService.success('Creado exitosamente.');
        }
      });
  }

  onDelete(row: any) {
    const mensaje = '¿Está seguro que desea eliminar el registro?';
    const disposable = this.dialogService
      .addDialog(ConfirmComponent, {
        title: 'Confirmación',
        message: mensaje,
      })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.service.delete(row.id).subscribe((x) => {
            this.reloadTable();
            this.alertService.success('Eliminado exitosamente.');
          });
        }
      });
  }

  search() {
    console.log('llega hasta aca');
    this.dataSource = new CrudDataSource(
      this.service!,
      this.paginator,
      this.sort,
      this.filter
    );
  }

  reloadTable() {
    this.ngOnInit();
  }
}
