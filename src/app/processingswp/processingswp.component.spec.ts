import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingswpComponent } from './processingswp.component';

describe('ProcessingswpComponent', () => {
  let component: ProcessingswpComponent;
  let fixture: ComponentFixture<ProcessingswpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingswpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingswpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
