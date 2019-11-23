import { TestBed } from '@angular/core/testing';

import { PupiloService } from './pupilo.service';

describe('PupiloService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PupiloService = TestBed.get(PupiloService);
    expect(service).toBeTruthy();
  });
});
