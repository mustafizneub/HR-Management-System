import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewLeaverequestComponent } from './adminview-leaverequest.component';

describe('AdminviewLeaverequestComponent', () => {
  let component: AdminviewLeaverequestComponent;
  let fixture: ComponentFixture<AdminviewLeaverequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminviewLeaverequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewLeaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
