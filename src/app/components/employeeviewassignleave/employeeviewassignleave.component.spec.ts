import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeviewassignleaveComponent } from './employeeviewassignleave.component';

describe('EmployeeviewassignleaveComponent', () => {
  let component: EmployeeviewassignleaveComponent;
  let fixture: ComponentFixture<EmployeeviewassignleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeviewassignleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeviewassignleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
