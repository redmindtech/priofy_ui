import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistAComponent } from './checklist-a.component';

describe('ChecklistAComponent', () => {
  let component: ChecklistAComponent;
  let fixture: ComponentFixture<ChecklistAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
