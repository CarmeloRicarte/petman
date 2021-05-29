import { TestBed } from '@angular/core/testing';

import { RecepcionMercanciaService } from './recepcion-mercancia.service';

describe('RecepcionMercanciaService', () => {
  let service: RecepcionMercanciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepcionMercanciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
