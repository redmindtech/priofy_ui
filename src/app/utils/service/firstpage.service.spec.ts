import { TestBed } from '@angular/core/testing';

import { FirstpageService } from './firstpage.service';

describe('FirstpageService', () => {
  let service: FirstpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
