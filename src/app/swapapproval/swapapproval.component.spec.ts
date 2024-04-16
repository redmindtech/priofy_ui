import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapapprovalComponent } from './swapapproval.component';

describe('SwapapprovalComponent', () => {
  let component: SwapapprovalComponent;
  let fixture: ComponentFixture<SwapapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapapprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
