import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { JuegoUpdateComponent } from './juego-update.component';

describe('JuegoUpdateComponent', () => {
  let component: JuegoUpdateComponent;
  let fixture: ComponentFixture<JuegoUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoUpdateComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
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
