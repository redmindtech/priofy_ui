import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatordashboardComponent } from './operatordashboard.component';

describe('OperatordashboardComponent', () => {
  let component: OperatordashboardComponent;
  let fixture: ComponentFixture<OperatordashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatordashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatordashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
