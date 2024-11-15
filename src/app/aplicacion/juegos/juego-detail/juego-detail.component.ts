import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Juego } from '../juegos.model';
import { JuegoService } from '../juegos.service';
import { Location } from '@angular/common';
import { WishlistService } from '../wishlist.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-juego-detail',
  templateUrl: './juego-detail.component.html',
  styleUrls: ['./juego-detail.component.scss'],
})
export class JuegoDetailComponent implements OnInit {
  juego?: Juego;
  isInWishlist: boolean = false;
  idJuego?: number;
  token: string | null = null;
  userId: string = '';
  private userSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService,
    private location: Location,
    private wishlistService: WishlistService,
    private loginService: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log(this.token);
    this.token = this.loginService.userToken;
    console.log(this.token);
    const idJuegoParam = this.route.snapshot.paramMap.get('id');
    if (idJuegoParam) {
      this.idJuego = +idJuegoParam;
      this.juegoService.getJuego(this.idJuego).subscribe((juego) => {
        this.juego = juego;
      });
      if (this.token) {
        this.checkIfInWishlist(this.idJuego);
      }
    }
  }

  checkIfInWishlist(idJuego: number): void {
    // Verificar si el juego está en la wishlist
    this.wishlistService.isInWishlist(idJuego).subscribe((response) => {
      this.isInWishlist = response.isInWishlist;
      console.log('Está en wishlist:', this.isInWishlist);
    });
  }

  addToWishlist(): void {
    this.wishlistService.addToWishlist(this.juego!.id).subscribe(() => {
      this.isInWishlist = true;
      console.log('Juego agregado a la wishlist');
    });
  }

  removeFromWishlist(): void {
    this.wishlistService.removeFromWishlist(this.juego!.id).subscribe(() => {
      this.isInWishlist = false;
      console.log('Juego eliminado de la wishlist');
    });
  }

  back() {
    this.location.back();
  }
}
