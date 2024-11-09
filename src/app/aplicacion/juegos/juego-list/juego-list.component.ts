import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Juego } from '../juegos.model.js';

@Component({
  selector: 'app-juego-list',
  templateUrl: './juego-list.component.html',
  styleUrls: ['./juego-list.component.scss'],
})
export class JuegoListComponent {
  @Input() juegos: Juego[] = [];
  @Output() gameSelected = new EventEmitter<number>();

  onGameClick(juegoId: number): void {
    this.gameSelected.emit(juegoId);
  }
}
