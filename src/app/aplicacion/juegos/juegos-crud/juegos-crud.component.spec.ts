import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosCrudComponent } from './juegos-crud.component';

describe('JuegosCrudComponent', () => {
  let component: JuegosCrudComponent;
  let fixture: ComponentFixture<JuegosCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegosCrudComponent]
    });
    fixture = TestBed.createComponent(JuegosCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
