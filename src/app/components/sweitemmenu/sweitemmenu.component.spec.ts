import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SweItemMenuComponent } from './sweitemmenu.component';

describe('SidemenuComponent', () => {
  let component: SweItemMenuComponent;
  let fixture: ComponentFixture<SweItemMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SweItemMenuComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    });
    fixture = TestBed.createComponent(SweItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
