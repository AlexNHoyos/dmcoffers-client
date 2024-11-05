import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoDeleteComponent } from './juego-delete.component';

describe('JuegoDeleteComponent', () => {
  let component: JuegoDeleteComponent;
  let fixture: ComponentFixture<JuegoDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoDeleteComponent]
    });
    fixture = TestBed.createComponent(JuegoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
