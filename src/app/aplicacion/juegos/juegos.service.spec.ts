import { TestBed } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { JuegoService } from './juegos.service';

describe('JuegosService', () => {
  let service: JuegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(JuegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
