import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwprequestComponent } from './swprequest.component';

describe('SwprequestComponent', () => {
  let component: SwprequestComponent;
  let fixture: ComponentFixture<SwprequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwprequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwprequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
