import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosPorCategoriaComponent } from './juegos-por-categoria.component';

describe('JuegosPorCategoriaComponent', () => {
  let component: JuegosPorCategoriaComponent;
  let fixture: ComponentFixture<JuegosPorCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegosPorCategoriaComponent]
    });
    fixture = TestBed.createComponent(JuegosPorCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
