import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Juego } from '../../juegos.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-juego-detail-dialog',
  templateUrl: './juego-detail-dialog.component.html',
  styleUrls: ['./juego-detail-dialog.component.scss'],
})
export class JuegoDetailDialogComponent implements OnInit {
  environmentImg: string="";
  constructor(
    public dialogRef: MatDialogRef<JuegoDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { juego: Juego }
  ) {}

  ngOnInit():void{
    this.environmentImg = environment.urlImg;
    console.log(this.environmentImg + this.data.juego.image_path)
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
