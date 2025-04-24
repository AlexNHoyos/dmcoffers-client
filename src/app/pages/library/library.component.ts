import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LibraryService } from 'src/app/aplicacion/juegos/library.service';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  library: any[] = [];
  isLoggedIn: boolean = false;
  isLoading = true;
  isLibrary = true;

  constructor(
    private libraryService: LibraryService,
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
      this.loadLibrary();
    }
  }

  loadLibrary() {
    this.libraryService.getLibrary().subscribe(
      (data) => {
        this.library = data;
        this.isLoading = false;
      },
      (error) => {
        console.error(
          'Error al cargar la biblioteca',
          error.error?.errors[0]?.msg || error.message
        );
        this.isLoading = false;
      }
    );
  }

  // Acción para ver el detalle del juego
  verDetalle(juegoId: number) {
    this.router.navigate(['/juego', juegoId]);
  }
}
