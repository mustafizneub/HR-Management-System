import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryHomeComponent } from './employee-salary-home.component';

describe('EmployeeSalarayHomeComponent', () => {
  let component: EmployeeSalaryHomeComponent;
  let fixture: ComponentFixture<EmployeeSalaryHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeSalaryHomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
