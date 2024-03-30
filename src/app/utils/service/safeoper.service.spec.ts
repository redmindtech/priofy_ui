import { TestBed } from '@angular/core/testing';

import { SafeoperService } from './safeoper.service';

describe('SafeoperService', () => {
  let service: SafeoperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafeoperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
