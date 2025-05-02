import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Juego } from '../../juegos.model';
import { JuegoService } from '../../juegos.service';
import { DesarrolladoresService } from 'src/app/aplicacion/desarrolladores/desarrolladores.service';
import { PublisherService } from 'src/app/aplicacion/publishers/publisher.service';
import { CategoriaService } from 'src/app/aplicacion/categorias/categoria.service';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';

@Component({
  selector: 'app-juego-create',
  templateUrl: './juego-create.component.html',
  styleUrls: ['./juego-create.component.scss'],
})
export class JuegoCreateComponent implements OnInit {
  selectedFile: File | null = null;
  today: Date = new Date();
  juego: Juego = {
    id: 0,
    gamename: '',
    release_date: null,
    publishment_date: new Date().toISOString(),
    developerName: '',
    publisherName: '',
    categoriasNames: [],
    price: 0,
    creationuser: '',
    creationtimestamp: new Date().toISOString(),
    modificationtimestamp: null,
    modificationuser: null,
  };

  desarrolladores: any[] = [];
  publishers: any[] = [];
  categorias: any[] = [];

  constructor(
    private juegoService: JuegoService,
    private desarrolladoresService: DesarrolladoresService,
    private publisherService: PublisherService,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<JuegoCreateComponent>,
    private userUtilsService: UserUtilsService
  ) {}

  ngOnInit(): void {
    // Obtén y asigna el usuario al crear el juego
    this.userUtilsService.setLoggedInUser().subscribe((username) => {
      if (username) {
        this.juego.creationuser = username;
      } else {
        console.log('No se encontró el usuario');
      }
    });
    // Cargar las listas de relaciones
    this.desarrolladoresService
      .getAllDesarrolladores()
      .subscribe((data) => (this.desarrolladores = data));
    this.publisherService
      .getAllPublishers()
      .subscribe((data) => (this.publishers = data));
    this.categoriaService
      .getAllCategorias()
      .subscribe((data) => (this.categorias = data));
  }

  loadDesarrolladores(): void {
    this.desarrolladoresService.getAllDesarrolladores().subscribe({
      next: (data) => (this.desarrolladores = data),
      error: (error) => console.error('Error al cargar desarrolladores', error),
    });
  }

  loadPublishers(): void {
    this.publisherService.getAllPublishers().subscribe({
      next: (data) => (this.publishers = data),
      error: (error) => console.error('Error al cargar publishers', error),
    });
  }

  loadCategorias(): void {
    this.categoriaService.getAllCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (error) => console.error('Error al cargar categorías', error),
    });
  }

  createJuego(): void {
  const formData = new FormData();

  const juegoToSend = {
    gamename: this.juego.gamename,
    release_date: this.juego.release_date
      ? new Date(this.juego.release_date).toISOString()
      : null,
    publishment_date: this.juego.publishment_date
      ? new Date(this.juego.publishment_date).toISOString()
      : null,
    creationuser: this.juego.creationuser,
    creationtimestamp: this.juego.creationtimestamp
      ? new Date(this.juego.creationtimestamp).toISOString()
      : null,
    id_developer: this.juego.developerName
      ? this.desarrolladores.find(
          (dev) => dev.developername === this.juego.developerName
        ).id
      : null,
    id_publisher: this.juego.publisherName
      ? this.publishers.find(
          (pub) => pub.publishername === this.juego.publisherName
        ).id
      : null,
    categorias: this.juego.categoriasNames.map(
      (catName) =>
        this.categorias.find((cat) => cat.description === catName).id
    ),
    price: this.juego.price,
  };

  formData.append('juego', JSON.stringify(juegoToSend));
  
  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }
  console.log('Juego enviado', formData);
  this.juegoService.createJuego(formData).subscribe({
    next: (response) => {
      console.log('Juego creado exitosamente', response);
      this.dialogRef.close(true);
    },
    error: (error) => {
      console.error('Error creando juego', error);
    },
  });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}
}
