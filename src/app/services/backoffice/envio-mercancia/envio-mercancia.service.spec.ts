import { TestBed } from '@angular/core/testing';

import { EnvioMercanciaService } from './envio-mercancia.service';

describe('EnvioMercanciaService', () => {
  let service: EnvioMercanciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvioMercanciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
