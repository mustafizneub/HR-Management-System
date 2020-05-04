import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadminviewLeaverequestComponent } from './editadminview-leaverequest.component';

describe('EditadminviewLeaverequestComponent', () => {
  let component: EditadminviewLeaverequestComponent;
  let fixture: ComponentFixture<EditadminviewLeaverequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditadminviewLeaverequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditadminviewLeaverequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
