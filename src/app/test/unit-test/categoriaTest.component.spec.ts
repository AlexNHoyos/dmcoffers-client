import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoriaCreateComponent } from 'src/app/aplicacion/categorias/categoria-create/categoria-create.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriaService } from 'src/app/aplicacion/categorias/categoria.service';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { of, throwError } from 'rxjs';

describe('CategoriaCreateComponent', () => {
  let component: CategoriaCreateComponent;
  let fixture: ComponentFixture<CategoriaCreateComponent>;
  let categoriaServiceSpy: jasmine.SpyObj<CategoriaService>;
  let userUtilsServiceSpy: jasmine.SpyObj<UserUtilsService>;

  beforeEach(async () => {
    // Crear espías para los servicios y el diálogo
    categoriaServiceSpy = jasmine.createSpyObj('CategoriaService', ['createCategoria']);
    userUtilsServiceSpy = jasmine.createSpyObj('UserUtilsService', ['setLoggedInUser']);

    await TestBed.configureTestingModule({
      declarations: [CategoriaCreateComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CategoriaService, useValue: categoriaServiceSpy },
        { provide: UserUtilsService, useValue: userUtilsServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaCreateComponent);
    component = fixture.componentInstance;
  });

  it('debería inicializar creationuser con el usuario logueado en ngOnInit', fakeAsync(() => {
    userUtilsServiceSpy.setLoggedInUser.and.returnValue(of('testUser'));
    fixture.detectChanges(); // Ejecuta ngOnInit
    tick();
    expect(component.categoria.creationuser).toBe('testUser');
  }));

  it('debería registrar un error si no se encuentra el usuario logueado', fakeAsync(() => {
    spyOn(console, 'log');
    userUtilsServiceSpy.setLoggedInUser.and.returnValue(of(null));
    fixture.detectChanges(); // Ejecuta ngOnInit
    tick();
    expect(console.log).toHaveBeenCalledWith('No userId found');
  }));
});