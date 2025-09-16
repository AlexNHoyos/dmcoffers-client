import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { JuegoDeleteComponent } from './juego-delete.component';
import { MatIconModule } from '@angular/material/icon';

describe('JuegoDeleteComponent', () => {
  let component: JuegoDeleteComponent;
  let fixture: ComponentFixture<JuegoDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoDeleteComponent],
      imports: [MatDialogModule, MatCardModule, MatIconModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(JuegoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
