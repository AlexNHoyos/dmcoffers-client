import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


import { JuegoListComponent } from './juego-list/juego-list.component';
import { JuegosComponent } from './juegos.component';

describe('JuegosComponent', () => {
  let component: JuegosComponent;
  let fixture: ComponentFixture<JuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuegosComponent, JuegoListComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()]
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
