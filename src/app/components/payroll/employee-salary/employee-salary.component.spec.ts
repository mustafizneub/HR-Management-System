import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalaryComponent } from './employee-salary.component';

describe('EmployeeSalarayComponent', () => {
  let component: EmployeeSalaryComponent;
  let fixture: ComponentFixture<EmployeeSalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeSalaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
