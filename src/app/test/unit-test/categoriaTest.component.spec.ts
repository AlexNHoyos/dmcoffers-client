import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoriaCreateComponent } from 'src/app/aplicacion/categorias/categoria-create/categoria-create.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriaService } from 'src/app/aplicacion/categorias/categoria.service';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CategoriaCreateComponent', () => {
  let component: CategoriaCreateComponent;
  let fixture: ComponentFixture<CategoriaCreateComponent>;
  let categoriaServiceSpy: jasmine.SpyObj<CategoriaService>;
  let userUtilsServiceSpy: jasmine.SpyObj<UserUtilsService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CategoriaCreateComponent>>;

  beforeEach(async () => {
    // Crear espías para los servicios y el diálogo
    categoriaServiceSpy = jasmine.createSpyObj('CategoriaService', ['createCategoria']);
    userUtilsServiceSpy = jasmine.createSpyObj('UserUtilsService', ['setLoggedInUser']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [CategoriaCreateComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CategoriaService, useValue: categoriaServiceSpy },
        { provide: UserUtilsService, useValue: userUtilsServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaCreateComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
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

  it('debería deshabilitar el botón de enviar cuando el formulario es inválido', () => {
    component.categoria.description = '';
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTrue();
  });

  it('debería habilitar el botón de enviar cuando el formulario es válido', () => {
    component.categoria.description = 'Categoría de prueba';
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalse();
  });

  it('debería mostrar un mensaje de error cuando la descripción está vacía y se ha tocado', () => {
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input[name="descripcion"]')).nativeElement;
    input.dispatchEvent(new Event('blur')); // Simula el toque
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('mat-error'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('La descripcion no puede estar vacía');
  });

  it('debería limpiar la descripción cuando se hace clic en el botón de limpiar', () => {
    component.categoria.description = 'Categoría de prueba';
    fixture.detectChanges();
    const clearButton = fixture.debugElement.query(By.css('button[matSuffix]')).nativeElement;
    clearButton.click();
    fixture.detectChanges();
    expect(component.categoria.description).toBe('');
  });

  it('debería llamar a createCategoria y cerrar el diálogo con true en caso de éxito', fakeAsync(() => {
    component.categoria.description = 'Categoría de prueba';
    categoriaServiceSpy.createCategoria.and.returnValue(of({ 
      id: 1, 
      description: 'Categoría de prueba', 
      creationtimestamp: new Date().toISOString(), 
      creationuser: 'testUser' 
    }));
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    tick();
    expect(categoriaServiceSpy.createCategoria).toHaveBeenCalledWith(jasmine.objectContaining({
      description: 'Categoría de prueba'
    }));
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  }));

  it('debería registrar un error si createCategoria falla', fakeAsync(() => {
    spyOn(console, 'error');
    component.categoria.description = 'Categoría de prueba';
    categoriaServiceSpy.createCategoria.and.returnValue(throwError(() => new Error('Error del servidor')));
    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    tick();
    expect(console.error).toHaveBeenCalledWith('Error creando categoria', jasmine.any(Error));
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  }));

  it('debería cerrar el diálogo con false cuando se llama a cancel', () => {
    component.cancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });
});