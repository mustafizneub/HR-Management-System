import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditemployeeviewLeaveRequestComponent } from './editemployeeview-leave-request.component';

describe('EditemployeeviewLeaveRequestComponent', () => {
  let component: EditemployeeviewLeaveRequestComponent;
  let fixture: ComponentFixture<EditemployeeviewLeaveRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditemployeeviewLeaveRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditemployeeviewLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
