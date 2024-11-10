import { TestBed } from '@angular/core/testing';

import { JuegoService } from './juegos.service';

describe('JuegosService', () => {
  let service: JuegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
