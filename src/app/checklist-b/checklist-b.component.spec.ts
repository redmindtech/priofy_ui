import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistBComponent } from './checklist-b.component';

describe('ChecklistBComponent', () => {
  let component: ChecklistBComponent;
  let fixture: ComponentFixture<ChecklistBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
