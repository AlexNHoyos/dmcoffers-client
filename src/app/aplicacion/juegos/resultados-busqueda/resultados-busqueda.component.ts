import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JuegoService } from 'src/app/aplicacion/juegos/juegos.service';
import { Juego } from '../juegos.model';
import { WishlistService } from '../wishlist.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss'],
})
export class ResultadosBusquedaComponent implements OnInit {
  juegos: any[] = [];
  searchTerm: string = '';
  isLoggedIn: boolean = false;
  private userSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService,
    private router: Router,
    private wishlistService: WishlistService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Verificar si el usuario está logueado
    this.isLoggedIn = this.loginService.isLoggedIn();

    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['param'];
      this.buscarJuegos(this.searchTerm);
    });
  }

  buscarJuegos(term: string) {
    this.juegoService.searchJuegosByName(term).subscribe(
      (data: Juego[]) => {
        this.juegos = data.map((juego) => ({
          ...juego,
          isInWishlist: false, // Inicializamos isInWishlist como false
        }));
        this.juegos.forEach((juego) => {
          this.checkIfInWishlist(juego); // Verifica el estado de wishlist para cada juego
        });
      },
      (error) => {
        console.error('Error buscando juegos:', error);
      }
    );
  }

  verDetalle(juegoId: number) {
    this.router.navigate(['/juego', juegoId]);
  }

  // Método para manejar la adición o eliminación de un juego de la wishlist
  toggleWishlist(juego: Juego): void {
    if (this.isLoggedIn) {
      if (juego.isInWishlist) {
        this.removeFromWishlist(juego);
      } else {
        this.addToWishlist(juego);
      }
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
        console.log('Juego agregado a la wishlist');
      });
    }
  }

  removeFromWishlist(juego: Juego): void {
    if (this.isLoggedIn) {
      this.wishlistService.removeFromWishlist(juego.id).subscribe(() => {
        juego.isInWishlist = false;
        console.log('Juego eliminado de la wishlist');
      });
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
