import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipConfirmationDialogComponent } from './skip-confirmation-dialog.component';

describe('SkipConfirmationDialogComponent', () => {
  let component: SkipConfirmationDialogComponent;
  let fixture: ComponentFixture<SkipConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkipConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
