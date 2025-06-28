import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JuegoListComponent } from 'src/app/aplicacion/juegos/juego-list/juego-list.component';
import { JuegosComponent } from 'src/app/aplicacion/juegos/juegos.component';
import { HomeComponent } from './home.component';
import { Juego } from 'src/app/aplicacion/juegos/juegos.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, JuegosComponent, JuegoListComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ] 
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
