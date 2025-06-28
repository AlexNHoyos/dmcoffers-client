import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './header.component';
import { NavComponent } from '../nav/nav.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, NavComponent],
      imports: [MatIconModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
