import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoDetailDialogComponent } from './juego-detail-dialog.component';

describe('JuegoDetailDialogComponent', () => {
  let component: JuegoDetailDialogComponent;
  let fixture: ComponentFixture<JuegoDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoDetailDialogComponent]
    });
    fixture = TestBed.createComponent(JuegoDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
