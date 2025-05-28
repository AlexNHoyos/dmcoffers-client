import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { JuegoDeleteComponent } from './juego-delete.component';

describe('JuegoDeleteComponent', () => {
  let component: JuegoDeleteComponent;
  let fixture: ComponentFixture<JuegoDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JuegoDeleteComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(JuegoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
