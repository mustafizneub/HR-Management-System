import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaverequestComponent } from './admin-leaverequest.component';

describe('AdminLeaverequestComponent', () => {
  let component: AdminLeaverequestComponent;
  let fixture: ComponentFixture<AdminLeaverequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLeaverequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
