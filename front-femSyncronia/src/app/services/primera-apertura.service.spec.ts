import { TestBed } from '@angular/core/testing';

import { PrimeraAperturaService } from './primera-apertura.service';

describe('PrimeraAperturaService', () => {
  let service: PrimeraAperturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimeraAperturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
