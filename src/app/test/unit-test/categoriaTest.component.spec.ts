import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoriaCreateComponent } from 'src/app/aplicacion/categorias/categoria-create/categoria-create.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoriaService } from 'src/app/aplicacion/categorias/categoria.service';
import { UserUtilsService } from 'src/app/services/user/user-util-service.service';
import { provideHttpClientTesting } from '@angular/common/http/testing'; // solo esto
import { of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

describe('CategoriaCreateComponent', () => {
  let component: CategoriaCreateComponent;
  let fixture: ComponentFixture<CategoriaCreateComponent>;
  let categoriaServiceSpy: jasmine.SpyObj<CategoriaService>;
  let userUtilsServiceSpy: jasmine.SpyObj<UserUtilsService>;

  beforeEach(async () => {
    categoriaServiceSpy = jasmine.createSpyObj('CategoriaService', ['createCategoria']);
    userUtilsServiceSpy = jasmine.createSpyObj('UserUtilsService', ['setLoggedInUser']);

    await TestBed.configureTestingModule({
      declarations: [CategoriaCreateComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [
        { provide: CategoriaService, useValue: categoriaServiceSpy },
        { provide: UserUtilsService, useValue: userUtilsServiceSpy },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideHttpClientTesting() 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaCreateComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  it('debería inicializar creationuser con el usuario logueado en ngOnInit', fakeAsync(() => {
    userUtilsServiceSpy.setLoggedInUser.and.returnValue(of('testUser'));

    fixture.detectChanges();
    tick();

    expect(userUtilsServiceSpy.setLoggedInUser).toHaveBeenCalled();
    expect(component.categoria.creationuser).toBe('testUser');
  }));

  it('debería registrar un error si no se encuentra el usuario logueado', fakeAsync(() => {
    spyOn(console, 'log');

    userUtilsServiceSpy.setLoggedInUser.and.returnValue(of(null));

    fixture.detectChanges();
    tick();

    expect(userUtilsServiceSpy.setLoggedInUser).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('No userId found');
  }));
});
