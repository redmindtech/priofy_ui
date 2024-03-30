import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeoperComponent } from './safeoper.component';

describe('SafeoperComponent', () => {
  let component: SafeoperComponent;
  let fixture: ComponentFixture<SafeoperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafeoperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
