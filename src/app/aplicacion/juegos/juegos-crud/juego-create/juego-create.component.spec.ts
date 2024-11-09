import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoCreateComponent } from './juego-create.component';

describe('JuegoCreateComponent', () => {
  let component: JuegoCreateComponent;
  let fixture: ComponentFixture<JuegoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoCreateComponent]
    });
    fixture = TestBed.createComponent(JuegoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
