import { TestBed } from '@angular/core/testing';

import { StartsService } from './starts.service';

describe('StartsService', () => {
  let service: StartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
