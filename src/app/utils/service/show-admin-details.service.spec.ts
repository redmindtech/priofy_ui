import { TestBed } from '@angular/core/testing';

import { ShowAdminDetailsService } from './show-admin-details.service';

describe('ShowAdminDetailsService', () => {
  let service: ShowAdminDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowAdminDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
