import { TestBed } from '@angular/core/testing';

import { SwapapprovalService } from './swapapproval.service';

describe('SwapapprovalService', () => {
  let service: SwapapprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwapapprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
