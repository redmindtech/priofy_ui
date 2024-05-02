import { TestBed } from '@angular/core/testing';

import { SwpcloseoutService } from './swpcloseout.service';

describe('SwpcloseoutService', () => {
  let service: SwpcloseoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwpcloseoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
