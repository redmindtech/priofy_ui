import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpendialogcompleteComponent } from './opendialogcomplete.component';

describe('OpendialogcompleteComponent', () => {
  let component: OpendialogcompleteComponent;
  let fixture: ComponentFixture<OpendialogcompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpendialogcompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpendialogcompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
