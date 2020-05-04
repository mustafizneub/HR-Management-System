import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadminLeaveComponent } from './editadmin-leave.component';

describe('EditadminLeaveComponent', () => {
  let component: EditadminLeaveComponent;
  let fixture: ComponentFixture<EditadminLeaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditadminLeaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditadminLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
