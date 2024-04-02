import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistCComponent } from './checklist-c.component';

describe('ChecklistCComponent', () => {
  let component: ChecklistCComponent;
  let fixture: ComponentFixture<ChecklistCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
