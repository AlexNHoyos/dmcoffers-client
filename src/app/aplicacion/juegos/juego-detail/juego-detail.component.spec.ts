import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { JuegoDetailComponent } from './juego-detail.component';

describe('JuegoDetailComponent', () => {
  let component: JuegoDetailComponent;
  let fixture: ComponentFixture<JuegoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoDetailComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatIconModule
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    });
    fixture = TestBed.createComponent(JuegoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
