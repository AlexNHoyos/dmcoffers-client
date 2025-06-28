import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { JuegoUpdateComponent } from './juego-update.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

describe('JuegoUpdateComponent', () => {
  let component: JuegoUpdateComponent;
  let fixture: ComponentFixture<JuegoUpdateComponent>;

  const mockJuego = {
    id: 1,
    gamename: 'Juego Test',
    price: 100,
    categoriasNames: ['Aventura'],
    developerName: 'Dev Studio',
    publisherName: 'Pub House',
    release_date: new Date().toISOString(),
    publishment_date: new Date().toISOString(),
    creationtimestamp: new Date().toISOString(),
    modificationtimestamp: new Date().toISOString(),
    modificationuser: 'tester',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoUpdateComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { juego : mockJuego } }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(JuegoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
