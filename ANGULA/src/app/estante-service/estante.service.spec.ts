import { TestBed } from '@angular/core/testing';

import { EstanteService } from './estante.service';

describe('EstanteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstanteService = TestBed.get(EstanteService);
    expect(service).toBeTruthy();
  });
});
