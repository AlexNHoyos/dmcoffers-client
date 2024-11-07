import { Component, OnInit } from '@angular/core';
import { JuegoService } from './juegos.service';
import { Router } from '@angular/router';
import { Juego } from './juegos.model';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss'],
})

//Idealmente mostrar los primeros 10 para "Nuevos lanzamientos"
export class JuegosComponent implements OnInit {
  juegos: Juego[] = [];

  constructor(
    private juegoService: JuegoService,
    private router: Router,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.juegoService.getJuegos().subscribe(
      (data: Juego[]) => {
        this.juegos = data.map((juego) => ({
          ...juego,
          isInWishlist: false, // Inicialmente, no están en la wishlist
        }));
      },
      (error) => {
        console.error('Error al obtener los juegos:', error);
      }
    );
  }

  verDetalle(juegoId: number): void {
    this.router.navigate(['/juego', juegoId]);
  }

  // Método para agregar o quitar juegos de la wishlist
  /*toggleWishlist(juego: Juego): void {
    if (juego.isInWishlist) {
      this.wishlistService.removeFromWishlist(juego.id).subscribe(
        () => {
          juego.isInWishlist = false; // Actualiza el estado de la wishlist
          console.log('Juego eliminado de la wishlist');
        },
        (error) => {
          console.error('Error al eliminar el juego de la wishlist', error);
        }
      );
    } else {
      this.wishlistService.addToWishlist(juego.id).subscribe(
        () => {
          juego.isInWishlist = true; // Actualiza el estado de la wishlist
          console.log('Juego agregado a la wishlist');
        },
        (error) => {
          console.error('Error al agregar el juego a la wishlist', error);
        }
      );
    }
  }*/
}
