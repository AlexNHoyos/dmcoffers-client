import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CategoriaCreateComponent } from 'src/app/aplicacion/categorias/categoria-create/categoria-create.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoriaService } from 'src/app/aplicacion/categorias/categoria.service';

import { of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { UserService } from 'src/app/services/user/user.service';

describe('CategoriaCreateComponent', () => {
  let component: CategoriaCreateComponent;
  let fixture: ComponentFixture<CategoriaCreateComponent>;
  let categoriaServiceSpy: jasmine.SpyObj<CategoriaService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    categoriaServiceSpy = jasmine.createSpyObj('CategoriaService', ['createCategoria']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['getLoggedInUsername']);

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
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
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

  it('Debería inicializar creationuser con el usuario logueado en ngOnInit', fakeAsync(() => {
    userServiceSpy.getLoggedInUsername.and.returnValue(of('testUser'));

    fixture.detectChanges();
    tick();

    expect(userServiceSpy.getLoggedInUsername).toHaveBeenCalled();
    expect(component.categoria.creationuser).toBe('testUser');
  }));

  it('Debería registrar un error si no se encuentra el usuario logueado', fakeAsync(() => {
    spyOn(console, 'log');

    userServiceSpy.getLoggedInUsername.and.returnValue(of(null));

    fixture.detectChanges();
    tick();

    expect(userServiceSpy.getLoggedInUsername).toHaveBeenCalled();
  }));
});
