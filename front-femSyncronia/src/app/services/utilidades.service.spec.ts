import { TestBed } from '@angular/core/testing';

import { UtilidadesService } from './utilidades.service';

describe('UtilidadesService', () => {
  let service: UtilidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
