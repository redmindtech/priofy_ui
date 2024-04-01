import { TestBed } from '@angular/core/testing';

import { ChecklistEService } from './checklist-e.service';

describe('ChecklistEService', () => {
  let service: ChecklistEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
