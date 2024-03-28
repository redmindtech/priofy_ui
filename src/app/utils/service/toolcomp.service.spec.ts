import { TestBed } from '@angular/core/testing';

import { ToolcompService } from './toolcomp.service';

describe('ToolcompService', () => {
  let service: ToolcompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolcompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
