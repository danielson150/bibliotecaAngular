import { TestBed } from '@angular/core/testing';

import { EmprestimoService } from './emprestimo.service';

describe('EmprestimoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmprestimoService = TestBed.get(EmprestimoService);
    expect(service).toBeTruthy();
  });
});
