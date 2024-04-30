import { TestBed } from '@angular/core/testing';

import { ProcessingswpService } from './processingswp.service';

describe('ProcessingswpService', () => {
  let service: ProcessingswpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingswpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
