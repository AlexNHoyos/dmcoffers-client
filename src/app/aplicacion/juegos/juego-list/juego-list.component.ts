import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Juego } from '../juegos.model';

@Component({
  selector: 'app-juego-list',
  templateUrl: './juego-list.component.html',
  styleUrls: ['./juego-list.component.scss'],
})
export class JuegoListComponent {
  @Input() juegos: Juego[] = [];
  @Input() isLoggedIn: boolean = false;
  @Output() gameSelected = new EventEmitter<number>();
  @Output() wishlistToggled = new EventEmitter<Juego>();

  onGameClick(juegoId: number): void {
    this.gameSelected.emit(juegoId);
  }
  // Llamar a wishlistToggled para agregar o quitar de la wishlist
  toggleWishlist(juego: Juego): void {
    this.wishlistToggled.emit(juego);
  }
}
