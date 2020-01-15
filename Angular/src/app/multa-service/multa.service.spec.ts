import { TestBed } from '@angular/core/testing';

import { MultaService } from './multa.service';

describe('MultaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultaService = TestBed.get(MultaService);
    expect(service).toBeTruthy();
  });
});
