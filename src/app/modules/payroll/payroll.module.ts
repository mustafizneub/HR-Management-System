import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { EmployeeSalaryHomeComponent } from './employee-salary-home/employee-salary-home.component';
import { PayslipComponent } from './payslip/payslip.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SalaryHistoryComponent } from './salary-history/salary-history.component';
import { SalaryDetailsComponent } from './salary-details/salary-details.component'
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [EmployeeSalaryComponent, EmployeeSalaryHomeComponent, PayslipComponent, SalaryHistoryComponent, SalaryDetailsComponent],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class PayrollModule { }
