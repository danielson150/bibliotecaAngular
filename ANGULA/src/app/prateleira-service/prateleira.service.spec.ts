import { TestBed } from '@angular/core/testing';

import { PrateleiraService } from './prateleira.service';

describe('PrateleiraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrateleiraService = TestBed.get(PrateleiraService);
    expect(service).toBeTruthy();
  });
});
