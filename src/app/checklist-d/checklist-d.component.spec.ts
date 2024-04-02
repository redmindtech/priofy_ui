import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistDComponent } from './checklist-d.component';

describe('ChecklistDComponent', () => {
  let component: ChecklistDComponent;
  let fixture: ComponentFixture<ChecklistDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
