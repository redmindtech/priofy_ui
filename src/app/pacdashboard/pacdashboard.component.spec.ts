import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacdashboardComponent } from './pacdashboard.component';

describe('PacdashboardComponent', () => {
  let component: PacdashboardComponent;
  let fixture: ComponentFixture<PacdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
