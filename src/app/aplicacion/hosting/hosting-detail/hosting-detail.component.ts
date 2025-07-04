import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hosting } from '../hosting.model';

@Component({
    selector: 'app-hosting-detail',
    templateUrl: './hosting-detail.component.html',
    styleUrls: ['./hosting-detail.component.scss'],
    standalone: false
})
export class HostingDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<HostingDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hosting: Hosting }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
