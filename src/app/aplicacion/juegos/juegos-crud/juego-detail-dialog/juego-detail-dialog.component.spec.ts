import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { JuegoDetailDialogComponent } from './juego-detail-dialog.component';
import { ActivatedRoute } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';

describe('JuegoDetailDialogComponent', () => {
  let component: JuegoDetailDialogComponent;
  let fixture: ComponentFixture<JuegoDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoDetailDialogComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } }},
        { provide: 'JuegoService', useValue: {} }, // Mock JuegoService
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { juego: {id: 1, gamename: 'Test Game', categoriasNames: ['Acción', 'Aventura'] } } }
      ]
    });
    fixture = TestBed.createComponent(JuegoDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
