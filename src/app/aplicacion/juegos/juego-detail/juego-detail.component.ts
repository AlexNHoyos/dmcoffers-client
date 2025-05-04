import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Juego } from '../juegos.model';
import { JuegoService } from '../juegos.service';
import { Location } from '@angular/common';
import { WishlistService } from '../wishlist.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { LibraryService } from '../library.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-juego-detail',
  templateUrl: './juego-detail.component.html',
  styleUrls: ['./juego-detail.component.scss'],
})
export class JuegoDetailComponent implements OnInit {
  juego?: Juego;
  isInWishlist: boolean = false;
  isInLibrary: boolean = false;
  idJuego?: number;
  token: string | null = null;
  userId: string = '';
  isInCart: boolean = false;
  cartBtnHover: boolean = false;
  environmentImg: string="";
  private userSubscription!: Subscription;

  constructor(

    private route: ActivatedRoute,
    private juegoService: JuegoService,
    private location: Location,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private loginService: LoginService,
    private userService: UserService,
    private libraryService: LibraryService
  ) {}

  ngOnInit(): void {
    this.token = this.loginService.userToken;
    this.environmentImg = environment.urlImg;

    const idJuegoParam = this.route.snapshot.paramMap.get('id');
    if (idJuegoParam) {
      this.idJuego = +idJuegoParam;
      this.juegoService.getJuego(this.idJuego).subscribe((juego) => {
        this.juego = juego;

      });
      if (this.token) {
        this.checkIfInWishlist(this.idJuego);
        this.checkIfInCart(this.idJuego);
        this.checkIfInLibrary(this.idJuego);

      }
    }
    
  }

  checkIfInWishlist(idJuego: number): void {
    // Verificar si el juego está en la wishlist
    this.wishlistService.isInWishlist(idJuego).subscribe((response) => {
      this.isInWishlist = response.isInWishlist;

    });
  }

  addToWishlist(): void {
    this.wishlistService.addToWishlist(this.juego!.id).subscribe(() => {
      this.isInWishlist = true;

    });
  }

  removeFromWishlist(): void {
    this.wishlistService.removeFromWishlist(this.juego!.id).subscribe(() => {
      this.isInWishlist = false;

    });
  }

  checkIfInCart(idJuego: number): void {
  this.cartService.isInCart(idJuego).subscribe((response) => {
    this.isInCart = response.isInCart;
  });
}

checkIfInLibrary(idJuego: number): void {
      this.libraryService.isInLibrary(idJuego).subscribe((response) => {
        this.isInLibrary = response.isInBiblioteca;
      });
  }

addToCart(): void {
  this.cartService.addToCart(this.juego!.id).subscribe(() => {
    this.isInCart = true;
  });
}

removeFromCart(): void {
    this.cartService.removeFromCart(this.juego!.id).subscribe(() => {
      this.isInCart = false;
    });
  }


  back() {
    this.location.back();
  }
}
