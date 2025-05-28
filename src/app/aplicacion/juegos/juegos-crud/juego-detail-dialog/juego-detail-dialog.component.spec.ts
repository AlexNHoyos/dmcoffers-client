import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { JuegoDetailDialogComponent } from './juego-detail-dialog.component';

describe('JuegoDetailDialogComponent', () => {
  let component: JuegoDetailDialogComponent;
  let fixture: ComponentFixture<JuegoDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoDetailDialogComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(JuegoDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
