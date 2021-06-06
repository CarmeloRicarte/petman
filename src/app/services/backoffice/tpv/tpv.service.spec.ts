import { TestBed } from '@angular/core/testing';

import { TpvService } from './tpv.service';

describe('TpvService', () => {
  let service: TpvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TpvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
