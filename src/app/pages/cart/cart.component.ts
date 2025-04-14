import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/aplicacion/juegos/cart.service';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  isLoggedIn: boolean = false;
  isLoading = true;
  isWishlist = true;

  constructor(
    private cartService: CartService,
    private router: Router,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();

    if (!this.isLoggedIn) {
      // Si no está autenticado, redirige a la página de inicio
      this.router.navigate(['/inicio']);
    } else {
      this.loadCart();
    }
  }

  loadCart() {
    this.cartService.getCart().subscribe(
      (data) => {
        this.cart = data;
        this.isLoading = false;
      },
      (error) => {
        console.error(
          'Error al cargar el carrito',
          error.error?.errors[0]?.msg || error.message
        );
        this.isLoading = false;
      }
    );
  }
  // Eliminar juego del carrito
  removeFromCart(juegoId: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Confirmar eliminación',
        message:
          '¿Estás seguro de que quieres eliminar este juego del carrito?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.cartService.removeFromCart(juegoId).subscribe(
          () => {
            // Recargar la wishlist después de eliminar el juego
            this.loadCart();
          },
          (error) => {
            console.error('Error al eliminar juego del carrito', error);
          }
        );
      }
    });
  }

  // Acción para ver el detalle del juego
  verDetalle(juegoId: number) {
    this.router.navigate(['/juego', juegoId]);
  }

}
