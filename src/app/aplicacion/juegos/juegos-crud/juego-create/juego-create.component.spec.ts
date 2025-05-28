import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing'; // solo esto

import { MatInputModule } from '@angular/material/input';
import { JuegoCreateComponent } from './juego-create.component';
import { JuegoService } from '../../juegos.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { of } from 'rxjs';
import { DesarrolladoresService } from 'src/app/aplicacion/desarrolladores/desarrolladores.service';
import { CategoriaService } from 'src/app/aplicacion/categorias/categoria.service';



describe('JuegoCreateComponent', () => {
  let component: JuegoCreateComponent;
  let service: DesarrolladoresService;
  let fixture: ComponentFixture<JuegoCreateComponent>;
  let juegoServiceSpy: jasmine.SpyObj<JuegoService>;
  let userUtilsServiceSpy: jasmine.SpyObj<UserUtilsService>;
  let desarrolladoresServiceSpy: jasmine.SpyObj<DesarrolladoresService>;


  beforeEach(async() => {

    userUtilsServiceSpy = jasmine.createSpyObj('UserUtilsService', ['setLoggedInUser']);
    juegoServiceSpy = jasmine.createSpyObj('JuegoService', ['createJuego']);
    desarrolladoresServiceSpy = jasmine.createSpyObj('DesarrolladoresService', ['getDesarrolladores', 'getDesarrollador', 'getPublishers']);
    desarrolladoresServiceSpy.getDesarrollador.and.returnValue(of({
      id: 1,
      developername: 'Dev Studio',
      foundation_date: '2020-01-01',
      status: true,
      creationtimestamp: '2020-01-01T00:00:00Z',
      creationuser: 'testUser'
    }));

    await TestBed.configureTestingModule({
      declarations: [JuegoCreateComponent],
      imports: 
      [FormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [  
        DesarrolladoresService,
        CategoriaService,
              {provide : DesarrolladoresService, useValue:desarrolladoresServiceSpy },
              { provide: JuegoService, useValue: juegoServiceSpy },
              { provide: UserUtilsService, useValue: userUtilsServiceSpy },
              { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
              { provide: MAT_DIALOG_DATA, useValue: {} },
              provideHttpClient(withInterceptorsFromDi()),
              provideHttpClientTesting()]
    }).compileComponents();

    service = TestBed.inject(DesarrolladoresService);
    fixture = TestBed.createComponent(JuegoCreateComponent);
    component = fixture.componentInstance;

    component.desarrolladores = [{ developername: 'Dev Studio' }];
    component.publishers = [{ publishername: 'Pub House' }];
    component.categorias = [{ description: 'Aventura' }];

    fixture.detectChanges();
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  it('Debería crear el juego', () => {
    expect(component).toBeTruthy();
  });
  it('el formulario debería ser inválido inicialmente', () => {
    expect(fixture.nativeElement.querySelector('form').checkValidity()).toBeFalse();
  });

  it('debería habilitar el botón cuando el formulario sea válido', fakeAsync(() => {
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
      creationuser: 'testUser'
    };
    fixture.detectChanges();
    tick();

    const btnCrear = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btnCrear.disabled).toBeFalse();
  }));

  it('debería llamar a createJuego al hacer clic en Crear', fakeAsync(() => {
    spyOn(component, 'createJuego');
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
      creationuser: 'testUser'
    };

    fixture.detectChanges();
    tick();

    const btnCrear = fixture.nativeElement.querySelector('button[type="submit"]');
    btnCrear.click();

    expect(component.createJuego).toHaveBeenCalled();
  }));
});
