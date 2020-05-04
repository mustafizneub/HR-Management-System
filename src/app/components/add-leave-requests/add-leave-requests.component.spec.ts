import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveRequestsComponent } from './add-leave-requests.component';

describe('AddLeaveRequestsComponent', () => {
  let component: AddLeaveRequestsComponent;
  let fixture: ComponentFixture<AddLeaveRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeaveRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeaveRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
