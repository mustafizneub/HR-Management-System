import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeaverequestComponent } from './assign-leaverequest.component';

describe('AssignLeaverequestComponent', () => {
  let component: AssignLeaverequestComponent;
  let fixture: ComponentFixture<AssignLeaverequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignLeaverequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignLeaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
