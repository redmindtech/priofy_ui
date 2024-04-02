import { TestBed } from '@angular/core/testing';

import { ChecklistBService } from './checklist-b.service';

describe('ChecklistBService', () => {
  let service: ChecklistBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
