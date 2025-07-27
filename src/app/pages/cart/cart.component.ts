import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/aplicacion/juegos/cart.service';
import { Juego } from 'src/app/aplicacion/juegos/juegos.model';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { environment } from 'src/environments/environment';

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
  juegos: Juego[] = [];
  total: number = 0;
  environmentImg: string="";

  constructor(
    private cartService: CartService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.environmentImg = environment.urlImg;
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe(
      (juegos) => {
        this.juegos = juegos;
        this.total = juegos.reduce((sum,juego) => sum + (typeof juego.price === 'number' ? juego.price : 0), 0); // Verifica que si el juego no tiene precio le asigna 0
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

  checkout(): void {
    this.cartService.checkout().subscribe(() => {
      alert('Compra realizada con éxito 🎉');
      this.loadCart(); // Para que se vacíe el carrito
    });
  }

  // Acción para ver el detalle del juego
  verDetalle(juegoId: number) {
    this.router.navigate(['/juego', juegoId]);
  }

}
