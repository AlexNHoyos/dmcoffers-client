import { Component, OnInit } from '@angular/core';
import { JuegoService } from './juegos.service';
import { Router } from '@angular/router';
import { Juego } from './juegos.model';
import { WishlistService } from './wishlist.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { LibraryService } from './library.service';

@Component({
    selector: 'app-juegos',
    templateUrl: './juegos.component.html',
    styleUrls: ['./juegos.component.scss'],
    standalone: false
})

//Idealmente mostrar los primeros 10 para "Nuevos lanzamientos"
export class JuegosComponent implements OnInit {
  juegos: Juego[] = [];
  userId: string = '';
  isInWishlist: boolean = false;
  isInLibrary: boolean = false;
  isLoggedIn: boolean = false;
  private userSubscription!: Subscription;

  constructor(
    private juegoService: JuegoService,
    private router: Router,
    private wishlistService: WishlistService,
    private loginService: LoginService,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    // Verificar si el usuario está logueado
    this.isLoggedIn = this.loginService.isLoggedIn();

    this.juegoService.getJuegos().subscribe(
      (data: Juego[]) => {
        this.juegos = data.map((juego) => ({
          ...juego,
          isInWishlist: false, // Inicialmente, no están en la wishlist
          isInLibrary: false, // Inicialmente, no están en la biblioteca
        }));
        // Verificar si cada juego está en la wishlist
        this.juegos.forEach((juego) => this.checkIfInWishlist(juego));
        this.juegos.forEach((juego) => this.checkIfInLibrary(juego));

      },
      (error) => {
        console.error('Error al obtener los juegos:', error);
      }
    );
  }

  verDetalle(juegoId: number): void {
    this.router.navigate(['/juego', juegoId]);
  }

  // Método para manejar la adición o eliminación de un juego de la wishlist
  toggleWishlist(juego: Juego): void {
    if (juego.isInWishlist) {
      this.removeFromWishlist(juego);
    } else {
      this.addToWishlist(juego);
    }
  }

  checkIfInWishlist(juego: Juego): void {
    if (this.isLoggedIn) {
      this.wishlistService.isInWishlist(juego.id).subscribe((response) => {
        juego.isInWishlist = response.isInWishlist;
      });
    }
  }

  addToWishlist(juego: Juego): void {
    if (this.isLoggedIn) {
      this.wishlistService.addToWishlist(juego.id).subscribe(() => {
        juego.isInWishlist = true;
      });
    }
  }

  removeFromWishlist(juego: Juego): void {
    if (this.isLoggedIn) {
      this.wishlistService.removeFromWishlist(juego.id).subscribe(() => {
        juego.isInWishlist = false;
      });
    }
  }

  checkIfInLibrary(juego: Juego): void {
    if (this.isLoggedIn) {
      this.libraryService.isInLibrary(juego.id).subscribe((response) => {
        juego.isInLibrary = response.isInBiblioteca;
      });
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
