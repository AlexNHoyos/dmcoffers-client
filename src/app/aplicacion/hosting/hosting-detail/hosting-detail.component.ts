import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HostingPublisher } from '../hosting.model';

@Component({
  selector: 'app-hosting-detail',
  templateUrl: './hosting-detail.component.html',
  styleUrls: ['./hosting-detail.component.scss'],
  standalone: false
})
export class HostingDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<HostingDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hostingpublisher: HostingPublisher }
  ) {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
