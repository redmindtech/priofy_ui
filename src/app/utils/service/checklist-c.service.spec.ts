import { TestBed } from '@angular/core/testing';

import { ChecklistCService } from './checklist-c.service';

describe('ChecklistCService', () => {
  let service: ChecklistCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
