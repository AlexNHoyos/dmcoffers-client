import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Juego } from '../juegos.model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-juego-list',
    templateUrl: './juego-list.component.html',
    styleUrls: ['./juego-list.component.scss'],
    standalone: false
})
export class JuegoListComponent implements OnInit {
  environmentImg: string="";
  @Input() juegos: Juego[] = [];
  @Input() isLoggedIn: boolean = false;
  @Input() isWishlist: boolean = false;
  @Input() isLibrary: boolean = false;
  @Output() gameSelected = new EventEmitter<number>();
  @Output() wishlistToggled = new EventEmitter<Juego>();
  @Output() removeFromWishlist = new EventEmitter<number>();

  ngOnInit(): void {
    this.environmentImg = environment.urlImg;
  }

  onGameClick(juegoId: number): void {
    this.gameSelected.emit(juegoId);
  }

  // Llamar a wishlistToggled para agregar o quitar de la wishlist
  toggleWishlist(juego: Juego): void {
    this.wishlistToggled.emit(juego);
  }

  emitRemoveFromWishlist(juegoId: number) {
    this.removeFromWishlist.emit(juegoId);
  }
}
