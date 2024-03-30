import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevaitionComponent } from './devaition.component';

describe('DevaitionComponent', () => {
  let component: DevaitionComponent;
  let fixture: ComponentFixture<DevaitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevaitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevaitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
