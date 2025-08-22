import { Component, OnInit } from '@angular/core';
import { Juego } from '../juegos.model';
import { JuegoService } from '../juegos.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-juegos-por-categoria',
    templateUrl: './juegos-por-categoria.component.html',
    styleUrls: ['./juegos-por-categoria.component.scss'],
    standalone: false
})
export class JuegosPorCategoriaComponent implements OnInit {
  juegos: Juego[] = [];
  categorias: string[] = [];
  categoriaSeleccionada: string = '';
  environmentImg: string="";

  constructor(private juegoService: JuegoService, private router: Router) {}

  ngOnInit(): void {
    this.environmentImg = environment.urlImg;
    this.juegoService.getJuegos().subscribe((data) => {
      this.juegos = data;
      this.categorias = [...new Set(data.flatMap((j) => j.categoriasNames))];
      
    });
  }

  get juegosFiltrados(): Juego[] {
    if (!this.categoriaSeleccionada) return this.juegos;
    return this.juegos.filter((j) =>
      j.categoriasNames.includes(this.categoriaSeleccionada)
    );
  }

  verDetalle(id: number): void {
    this.router.navigate(['/juego', id]);
  }
}
