import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { ErrorDialogComponent } from 'src/app/components/error-dialog/error-dialog.component';
import { JuegoService } from '../../juegos.service';
import { Juego } from '../../juegos.model';
import { DesarrolladoresService } from 'src/app/aplicacion/desarrolladores/desarrolladores.service';
import { PublisherService } from 'src/app/aplicacion/publishers/publisher.service';
import { CategoriaService } from 'src/app/aplicacion/categorias/categoria.service';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-juego-update',
  templateUrl: './juego-update.component.html',
  standalone: false
})
export class JuegoUpdateComponent {
  environmentImg: string = "";
  juego: Juego;
  desarrolladores: any[] = []; // Lista de desarrolladores
  publishers: any[] = []; // Lista de publishers
  categorias: any[] = []; // Lista de categorías
  selectedFile: File | null = null;

  constructor(
    private juegoService: JuegoService,
    private desarrolladoresService: DesarrolladoresService,
    private publisherService: PublisherService,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<JuegoUpdateComponent>,
    private userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { juego: Juego }
  ) {
    // Inicializa el juego con los datos pasados al dialog
    this.juego = { ...data.juego };
  }

  ngOnInit(): void {
    this.environmentImg = environment.urlImg
    // Cargar listas completas y seleccionar relaciones actuales
    this.loadDropdownData();

    // Asignar el usuario actual al campo modificationuser y timestamp de modificación
    this.userService.getLoggedInUsername().subscribe((username) => {
      if (username) {
        this.juego.modificationuser = username;
        this.juego.modificationtimestamp = new Date().toISOString();
      }
    });
  }

  loadDropdownData(): void {
    // Cargar todos los desarrolladores
    this.desarrolladoresService.getAllDesarrolladores().subscribe((data) => {
      this.desarrolladores = data;
    });

    // Cargar todos los publishers
    this.publisherService.getAllPublishers().subscribe((data) => {
      this.publishers = data;
    });

    // Cargar todas las categorías y preseleccionar las del juego
    this.categoriaService.getAllCategorias().subscribe((data) => {
      this.categorias = data;
      // Filtrar categorías actuales del juego para la selección
      this.juego.categoriasNames = this.data.juego.categoriasNames.map(
        (catName) =>
          data.find((cat) => cat.description === catName)?.description ||
          catName
      );
    });
    // Establecer el precio inicial al cargar el juego
    this.juego.price = this.data.juego.price;
  }

  onUpdateJuego(): void {
    const formData = new FormData();
    const juegoToSend = {
      ...this.juego,
      release_date: this.juego.release_date
        ? new Date(this.juego.release_date).toISOString()
        : null,
      publishment_date: this.juego.publishment_date
        ? new Date(this.juego.publishment_date).toISOString()
        : null,
      creationtimestamp: this.juego.creationtimestamp
        ? new Date(this.juego.creationtimestamp).toISOString()
        : null,
      modificationtimestamp: this.juego.modificationtimestamp
        ? new Date(this.juego.modificationtimestamp).toISOString()
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
    };

    formData.append('juego', JSON.stringify(juegoToSend));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.juegoService.updateJuego(this.juego.id, formData).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error actualizando juego:', error);
        const errorMessage = error?.error?.msg || 'Ocurrió un error';
        this.showErrorDialog(errorMessage);
      },
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  private showErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { title: 'Error', message, type: 'error' },
      width: '400px',
    });
  }

  cancel(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin guardar cambios
  }

  onDateInput(event: any) {
    let value: string = event.target.value.replace(/\D/g, ''); // solo números
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }
    event.target.value = value;
  }
}
