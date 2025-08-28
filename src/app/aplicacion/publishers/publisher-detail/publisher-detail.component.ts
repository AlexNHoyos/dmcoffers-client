import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Publisher } from '../publisher.model';

@Component({
    selector: 'app-publisher-detail',
    templateUrl: './publisher-detail.component.html',
    styleUrls: ['./publisher-detail.component.scss'],
    standalone: false
})
export class PublisherDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<PublisherDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { publisher: Publisher }
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}
