import { Component, OnInit } from '@angular/core';
import { Juego } from 'src/app/aplicacion/juegos/juegos.model';
import { JuegoService } from 'src/app/aplicacion/juegos/juegos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  juegos: Juego[] = [];

  constructor(private juegoService: JuegoService) {}

  ngOnInit(): void {
    this.juegoService.getJuegos().subscribe(
      (data: Juego[]) => {
        this.juegos = data;
      },
      (error) => {
        console.error('Error al obtener los juegos:', error);
      }
    );
  }
}
