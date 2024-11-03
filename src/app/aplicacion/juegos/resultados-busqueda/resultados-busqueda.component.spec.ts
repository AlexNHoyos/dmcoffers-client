import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosBusquedaComponent } from './resultados-busqueda.component';

describe('ResultadosBusquedaComponent', () => {
  let component: ResultadosBusquedaComponent;
  let fixture: ComponentFixture<ResultadosBusquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultadosBusquedaComponent]
    });
    fixture = TestBed.createComponent(ResultadosBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
