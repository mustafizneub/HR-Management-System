import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestsHomeComponent } from './leave-requests-home.component';

describe('LeaveRequestsHomeComponent', () => {
  let component: LeaveRequestsHomeComponent;
  let fixture: ComponentFixture<LeaveRequestsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveRequestsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRequestsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
