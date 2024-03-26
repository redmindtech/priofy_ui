import { TestBed } from '@angular/core/testing';

import { FirstPageService } from './first-page.service';

describe('FirstPageService', () => {
  let service: FirstPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
