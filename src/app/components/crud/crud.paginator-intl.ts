import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CrudMdPaginatorIntl extends MatPaginatorIntl {
  /**
   * A label for the page size selector.
   */
  override itemsPerPageLabel!: string;

  /**
   * A label for the button that increments the current page.
   */
  override nextPageLabel!: string;

  /**
   * A label for the button that decrements the current page.
   */
  override previousPageLabel!: string;

  ofLabel!: string;

  override lastPageLabel!: string;

  override firstPageLabel!: string;

  /**
   * A label for the range of items within the current page and the length of the whole list.
   */
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) {
      return `0 ` + this.ofLabel + ` ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ` + this.ofLabel + ` ${length}`;
  };

  constructor(translate: TranslateService) {
    super();
    translate
      .get('CRUD.ITEM_PER_PAGE', { value: '' })
      .subscribe((item_per_page: string) => {
        this.itemsPerPageLabel = item_per_page;
      });
    translate
      .get('CRUD.NEXT_PAGE', { value: '' })
      .subscribe((next_page: string) => {
        this.nextPageLabel = next_page;
      });
    translate
      .get('CRUD.PREVIOUS_PAGE', { value: '' })
      .subscribe((previous_page: string) => {
        this.previousPageLabel = previous_page;
      });
    translate
      .get('CRUD.OF_LABEL', { value: '' })
      .subscribe((of_label: string) => {
        this.ofLabel = of_label;
      });
    translate
      .get('CRUD.FIRTS_PAGE', { value: '' })
      .subscribe((firts_page_label: string) => {
        this.firstPageLabel = firts_page_label;
      });
    translate
      .get('CRUD.LAST_PAGE', { value: '' })
      .subscribe((last_page_label: string) => {
        this.lastPageLabel = last_page_label;
      });
  }
}
