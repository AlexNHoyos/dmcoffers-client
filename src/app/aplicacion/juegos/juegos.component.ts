import { Component, Input, OnInit } from '@angular/core';
import { JuegoService } from './juegos.service';
import { Router } from '@angular/router';
import { Juego } from './juegos.model';
import { WishlistService } from './wishlist.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { LibraryService } from './library.service';
import { environment } from 'src/environments/environment';

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
  ultimosLanzamientos: Juego[] = [];

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

    this.juegoService.getJuegos().subscribe({
      next: (data: Juego[]) => {
        const juegosOrdenados = [...data].sort((a, b) => {
          return new Date(b.release_date!).getTime() - new Date(a.release_date!).getTime();
        });
  
        this.ultimosLanzamientos = juegosOrdenados.slice(0, 5); //ultimos 5
        this.juegos = data.map(juego => ({
          ...juego,
          isInWishlist: false,
          isInLibrary: false
        }));
  
        // Solo si el usuario está logueado se consultan estas relaciones
        if (this.isLoggedIn) {
          this.juegos.forEach(j => this.checkIfInWishlist(j));
          this.juegos.forEach(j => this.checkIfInLibrary(j));
        }
      },
      error: (error) => {
        console.error('Error al obtener los juegos:', error);
      }
    });
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
