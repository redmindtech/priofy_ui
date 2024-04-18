import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwptableComponent } from './swptable.component';

describe('SwptableComponent', () => {
  let component: SwptableComponent;
  let fixture: ComponentFixture<SwptableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwptableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
