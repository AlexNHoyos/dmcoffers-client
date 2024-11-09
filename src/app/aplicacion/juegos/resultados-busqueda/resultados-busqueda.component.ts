import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JuegoService } from 'src/app/aplicacion/juegos/juegos.service';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss'],
})
export class ResultadosBusquedaComponent implements OnInit {
  juegos: any[] = [];
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['param'];
      this.buscarJuegos(this.searchTerm);
    });
  }

  buscarJuegos(term: string) {
    this.juegoService.searchJuegosByName(term).subscribe(
      (juegos) => {
        this.juegos = juegos;
      },
      (error) => {
        console.error('Error buscando juegos:', error);
      }
    );
  }

  verDetalle(juegoId: number) {
    this.router.navigate(['/juego', juegoId]);
  }
}
