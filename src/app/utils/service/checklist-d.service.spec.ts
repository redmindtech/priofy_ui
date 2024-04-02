import { TestBed } from '@angular/core/testing';

import { ChecklistDService } from './checklist-d.service';

describe('ChecklistDService', () => {
  let service: ChecklistDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
