import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { JuegoDetailDialogComponent } from './juego-detail-dialog.component';
import { ActivatedRoute } from '@angular/router';

import { MatSelectModule } from '@angular/material/select';
import { Juego } from '../../juegos.model';

describe('JuegoDetailDialogComponent', () => {
  let component: JuegoDetailDialogComponent;
  let fixture: ComponentFixture<JuegoDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoDetailDialogComponent],
      imports: [
        AppRoutingModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } }},
        { provide: 'JuegoService', useValue: {} }, // Mock JuegoService
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { juego: new Juego() } }
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
