import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ActivatedRoute } from '@angular/router';

import { ResultadosBusquedaComponent } from './resultados-busqueda.component';

import { of } from 'rxjs';

describe('ResultadosBusquedaComponent', () => {
  let component: ResultadosBusquedaComponent;
  let fixture: ComponentFixture<ResultadosBusquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultadosBusquedaComponent],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                search: 'test',
                page: 1,
                size: 10
              }
            },
            queryParams: of({
              search: 'test',
              page: 1,
              size: 10
            })
          }
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(ResultadosBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
