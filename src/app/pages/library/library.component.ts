import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from 'src/app/aplicacion/juegos/library.service';

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss'],
    standalone: false
})
export class LibraryComponent {
  library: any[] = [];
  isLoggedIn: boolean = false;
  isLoading = true;
  isLibrary = true;

  constructor(
    private libraryService: LibraryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadLibrary();
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
