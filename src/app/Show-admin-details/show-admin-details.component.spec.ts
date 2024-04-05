import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAdminDetailsComponent } from './show-admin-details.component';

describe('ShowAdminDetailsComponent', () => {
  let component: ShowAdminDetailsComponent;
  let fixture: ComponentFixture<ShowAdminDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAdminDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
