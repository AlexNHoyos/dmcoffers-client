import { Component, OnInit } from '@angular/core';
import { JuegoService } from './juegos.service';
import { Router } from '@angular/router';
import { Juego } from './juegos.model';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss'],
})

//Idealmente mostrar los primeros 10 para "Nuevos lanzamientos"
export class JuegosComponent implements OnInit {
  juegos: Juego[] = [];

  constructor(private juegoService: JuegoService, private router: Router) {}

  ngOnInit(): void {
    this.juegoService.getJuegos().subscribe(
      (data: Juego[]) => {
        this.juegos = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los juegos:', error);
      }
    );
  }

  verDetalle(juegoId: number): void {
    this.router.navigate(['/juego', juegoId]);
  }
}
