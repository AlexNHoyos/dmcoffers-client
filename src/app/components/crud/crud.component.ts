import { OnInit, Type, ViewChild, OnDestroy, Directive } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Page } from 'src/app/models/pagination';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { CrudService } from './crud.service';

import {
  CrudDataSource,
  DataSourceExtended,
  DTO,
  FilterDTO,
  ICRUDComponent,
} from './crud.model';
import { ITEMS_PER_PAGE } from '../constants/constants';
@Directive()
export abstract class CrudComponent<T>
  implements ICRUDComponent, OnInit, OnDestroy {
  displayedColumns: any;
  filter: FilterDTO = new FilterDTO();
  dataSource: DataSourceExtended<DTO> | null = null;
  itemsPerPage: number = ITEMS_PER_PAGE;

  abstract getEditComponent(): Type<any>;
  abstract getCreateComponent(): Type<any>;

  // Necesario para el componente md table
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    protected service: CrudService<Page<DTO>>,
    protected dialog: MatDialog
  ) {
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

  ngOnDestroy(): void { }

  // Abre un diálogo en modo solo lectura para ver un registro.
  onView(row: any) {
    let dialogRef = this.dialog.open(this.getEditComponent(), {
      width: '400px',
      data: { isReadOnly: true, id: row.id }, // Pasar los datos al componente de edición
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((isSaved) => {
      if (isSaved) {
        this.reloadTable();
      }
    });
  }

  // Abre un diálogo en modo edición para modificar un registro.
  onEdit(row: any) {
    const dialogRef = this.dialog.open(this.getEditComponent(), {
      width: '400px',
      data: { isReadOnly: false, id: row.id }, // Pasar los datos al componente de edición
    });

    dialogRef.afterClosed().subscribe((isSaved) => {
      if (isSaved) {
        this.reloadTable();
      }
    });
  }

  // Abre un diálogo en modo creación para registrar un nuevo elemento.
  onCreate() {
    const dialogRef = this.dialog.open(this.getCreateComponent(), {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((isSaved) => {
      if (isSaved) {
        this.reloadTable();
      }
    });
  }

  // Abre un diálogo de confirmación antes de eliminar un registro.
  onDelete(row: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        title: 'Confirmación',
        message: '¿Está seguro que desea eliminar el registro?',
      }, // Pasar datos de confirmación
    });

    dialogRef.afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.service.delete(row.id).subscribe(() => {
          this.reloadTable();
        });
      }
    });
  }

  search() {
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
