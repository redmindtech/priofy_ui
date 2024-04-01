import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistEComponent } from './checklist-e.component';

describe('ChecklistEComponent', () => {
  let component: ChecklistEComponent;
  let fixture: ComponentFixture<ChecklistEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
