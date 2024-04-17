import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwpcloseoutComponent } from './swpcloseout.component';

describe('SwpcloseoutComponent', () => {
  let component: SwpcloseoutComponent;
  let fixture: ComponentFixture<SwpcloseoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwpcloseoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwpcloseoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
