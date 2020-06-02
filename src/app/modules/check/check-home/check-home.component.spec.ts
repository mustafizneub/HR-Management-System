import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckHomeComponent } from './check-home.component';

describe('CheckHomeComponent', () => {
  let component: CheckHomeComponent;
  let fixture: ComponentFixture<CheckHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
