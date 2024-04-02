import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistFComponent } from './checklist-f.component';

describe('ChecklistFComponent', () => {
  let component: ChecklistFComponent;
  let fixture: ComponentFixture<ChecklistFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
