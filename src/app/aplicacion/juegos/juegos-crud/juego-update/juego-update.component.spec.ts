import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoUpdateComponent } from './juego-update.component';

describe('JuegoUpdateComponent', () => {
  let component: JuegoUpdateComponent;
  let fixture: ComponentFixture<JuegoUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoUpdateComponent]
    });
    fixture = TestBed.createComponent(JuegoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
