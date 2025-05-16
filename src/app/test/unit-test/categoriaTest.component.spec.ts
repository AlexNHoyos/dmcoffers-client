import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoriaCreateComponent } from 'src/app/aplicacion/categorias/categoria-create/categoria-create.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/aplicacion/categorias/categoria.service';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('CategoriaCreateComponent', () => {
  let component: CategoriaCreateComponent;
  let fixture: ComponentFixture<CategoriaCreateComponent>;
  let categoriaServiceSpy: jasmine.SpyObj<CategoriaService>;
  let userUtilsServiceSpy: jasmine.SpyObj<UserUtilsService>;

  beforeEach(async () => {
    // Crear espías para los servicios
    categoriaServiceSpy = jasmine.createSpyObj('CategoriaService', ['createCategoria']);
    userUtilsServiceSpy = jasmine.createSpyObj('UserUtilsService', ['setLoggedInUser']);

    await TestBed.configureTestingModule({
      declarations: [CategoriaCreateComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatCardModule, // Agrega MatCardModule para mat-card
        MatDialogModule // Agrega MatDialogModule para el diálogo
      ],
      providers: [
        { provide: CategoriaService, useValue: categoriaServiceSpy },
        { provide: UserUtilsService, useValue: userUtilsServiceSpy },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }, // Mock de MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} }, // Mock de MAT_DIALOG_DATA
        provideHttpClientTesting() // Configura el entorno de pruebas para HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaCreateComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // Limpia el componente solo si fixture está definido
    if (fixture) {
      fixture.destroy();
    }
  });

  it('debería inicializar creationuser con el usuario logueado en ngOnInit', fakeAsync(() => {
    // Configura el mock para devolver un usuario
    userUtilsServiceSpy.setLoggedInUser.and.returnValue(of('testUser'));

    // Ejecuta ngOnInit
    fixture.detectChanges();
    tick();

    // Verifica que creationuser se haya establecido
    expect(userUtilsServiceSpy.setLoggedInUser).toHaveBeenCalled();
    expect(component.categoria.creationuser).toBe('testUser');
  }));

  it('debería registrar un error si no se encuentra el usuario logueado', fakeAsync(() => {
    // Espía console.log
    spyOn(console, 'log');

    // Configura el mock para devolver null
    userUtilsServiceSpy.setLoggedInUser.and.returnValue(of(null));

    // Ejecuta ngOnInit
    fixture.detectChanges();
    tick();

    // Verifica que se registre el error
    expect(userUtilsServiceSpy.setLoggedInUser).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('No userId found');
  }));
});