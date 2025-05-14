import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WishlistService } from 'src/app/aplicacion/juegos/wishlist.service';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss'],
    standalone: false
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  isLoggedIn: boolean = false;
  isLoading = true;
  isWishlist = true;

  constructor(
    private wishlistService: WishlistService,
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
      this.loadWishlist();
    }
  }

  loadWishlist() {
    this.wishlistService.getWishlist().subscribe(
      (data) => {
        this.wishlist = data;
        this.isLoading = false;
      },
      (error) => {
        console.error(
          'Error al cargar la wishlist',
          error.error?.errors[0]?.msg || error.message
        );
        this.isLoading = false;
      }
    );
  }
  // Eliminar juego de la wishlist
  removeFromWishlist(juegoId: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        title: 'Confirmar eliminación',
        message:
          '¿Estás seguro de que quieres eliminar este juego de la lista de deseos?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.wishlistService.removeFromWishlist(juegoId).subscribe(
          () => {
            // Recargar la wishlist después de eliminar el juego
            this.loadWishlist();
          },
          (error) => {
            console.error('Error al eliminar juego de la wishlist', error);
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
