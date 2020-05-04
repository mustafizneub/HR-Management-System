import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveRequestsComponent } from './view-leave-requests.component';

describe('ViewLeaveRequestsComponent', () => {
  let component: ViewLeaveRequestsComponent;
  let fixture: ComponentFixture<ViewLeaveRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLeaveRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeaveRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
