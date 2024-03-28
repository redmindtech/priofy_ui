import { TestBed } from '@angular/core/testing';

import { ChecklistAService } from './checklist-a.service';

describe('ChecklistAService', () => {
  let service: ChecklistAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
