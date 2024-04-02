import { TestBed } from '@angular/core/testing';

import { ChecklistFService } from './checklist-f.service';

describe('ChecklistFService', () => {
  let service: ChecklistFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
