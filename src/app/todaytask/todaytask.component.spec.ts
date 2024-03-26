import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaytaskComponent } from './todaytask.component';

describe('TodaytaskComponent', () => {
  let component: TodaytaskComponent;
  let fixture: ComponentFixture<TodaytaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaytaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaytaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
