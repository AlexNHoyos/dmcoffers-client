import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { JuegoCreateComponent } from './juego-create.component';
import { JuegoService } from '../../juegos.service';
import { DesarrolladoresService } from 'src/app/aplicacion/desarrolladores/desarrolladores.service';
import { CategoriaService } from 'src/app/aplicacion/categorias/categoria.service';
import { UserService } from 'src/app/services/user/user.service';

describe('JuegoCreateComponent', () => {
  let component: JuegoCreateComponent;
  let fixture: ComponentFixture<JuegoCreateComponent>;
  let juegoServiceSpy: jasmine.SpyObj<JuegoService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let desarrolladoresServiceSpy: jasmine.SpyObj<DesarrolladoresService>;
  let categoriaServiceSpy: jasmine.SpyObj<CategoriaService>;

  beforeEach(async () => {
    categoriaServiceSpy = jasmine.createSpyObj('CategoriaService', ['getAllCategorias']);
    categoriaServiceSpy.getAllCategorias.and.returnValue(of([{
      id: 1,
      description: 'Aventura',
      creationtimestamp: new Date().toISOString(),
      creationuser: 'testUser'
    }]));

    userServiceSpy = jasmine.createSpyObj('UserService', ['getLoggedInUsername']);
    userServiceSpy.getLoggedInUsername.and.returnValue(of('testUser'));

    juegoServiceSpy = jasmine.createSpyObj('JuegoService', ['createJuego']);
    juegoServiceSpy.createJuego.and.returnValue(of({}));

    desarrolladoresServiceSpy = jasmine.createSpyObj('DesarrolladoresService', ['getAllDesarrolladores']);
    desarrolladoresServiceSpy.getAllDesarrolladores.and.returnValue(of([{
      id: 1,
      developername: 'Dev Studio',
      foundation_date: new Date().toISOString(),
      status: true,
      creationtimestamp: new Date().toISOString(),
      creationuser: 'testUser'
    }]));

    await TestBed.configureTestingModule({
      declarations: [JuegoCreateComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule
      ],
      providers: [
        { provide: DesarrolladoresService, useValue: desarrolladoresServiceSpy },
        { provide: JuegoService, useValue: juegoServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: CategoriaService, useValue: categoriaServiceSpy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JuegoCreateComponent);
    component = fixture.componentInstance;

    // Datos simulados para listas
    component.desarrolladores = [{ id: 1, developername: 'Dev Studio' }];
    component.publishers = [{ id: 1, publishername: 'Pub House' }];
    component.categorias = [{ id: 1, description: 'Aventura' }];
  });

  it('Debería crear el componente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('El formulario debería ser inválido inicialmente', () => {
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form');
    expect(form.checkValidity()).toBeFalse();
  });

it('Debería habilitar el botón Crear cuando el formulario sea válido', fakeAsync(() => {
    // campos requeridos
    component.juego.gamename = 'Juego Test';
    component.juego.developerName = 'Dev Studio';
    component.juego.publisherName = 'Pub House';
    component.juego.categoriasNames = ['Aventura'];
    component.juego.release_date = new Date().toISOString();
    component.juego.price = 50;
    fixture.detectChanges();
    tick();

    const btnCrear = fixture.debugElement.query(By.css('button[color="primary"]'));
    expect(btnCrear).withContext('No se encontró el botón Crear').toBeTruthy();
    expect(btnCrear.nativeElement.disabled).toBeFalse();
  }));

  it('Debería llamar a createJuego al hacer submit', fakeAsync(() => {
    const spy = spyOn(component, 'createJuego').and.callThrough();

    component.juego = {
      id: 1,
      gamename: 'Nombre Juego',
      developerName: 'Dev Studio',
      publisherName: 'Pub House',
      categoriasNames: ['Aventura'],
      price: 49.99,
      publishment_date: new Date().toISOString(),
      release_date: new Date().toISOString(),
      creationtimestamp: new Date().toISOString(),
      creationuser: 'testUser',
      modificationtimestamp: null,
      modificationuser: null
    };

    fixture.detectChanges();
    tick();

 // Llamar directamente a createJuego
    component.createJuego();
    tick();

    expect(juegoServiceSpy.createJuego).toHaveBeenCalled();
  }));
});
