import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ] 
    });
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
