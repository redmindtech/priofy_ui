import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementDeleteDialogComponent } from './user-management-delete-dialog.component';

describe('UserManagementDeleteDialogComponent', () => {
  let component: UserManagementDeleteDialogComponent;
  let fixture: ComponentFixture<UserManagementDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
