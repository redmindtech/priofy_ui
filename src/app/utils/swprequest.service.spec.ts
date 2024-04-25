import { TestBed } from '@angular/core/testing';

import { SwprequestService } from './swprequest.service';

describe('SwprequestService', () => {
  let service: SwprequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwprequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
