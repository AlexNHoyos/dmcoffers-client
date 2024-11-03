import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Juego } from '../juegos.model';
import { JuegoService } from '../juegos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-juego-detail',
  templateUrl: './juego-detail.component.html',
  styleUrls: ['./juego-detail.component.scss'],
})
export class JuegoDetailComponent implements OnInit {
  juego?: Juego;

  constructor(
    private route: ActivatedRoute,
    private juegoService: JuegoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const idJuego = this.route.snapshot.paramMap.get('id');
    if (idJuego) {
      this.juegoService.getJuego(+idJuego).subscribe((juego) => {
        this.juego = juego;
      });
    }
  }

  back() {
    this.location.back();
  }
}
