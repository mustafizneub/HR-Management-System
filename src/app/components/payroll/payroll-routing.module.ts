import { SalaryDetailsComponent } from './salary-details/salary-details.component';
import { PayslipComponent } from './payslip/payslip.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeSalaryHomeComponent } from './employee-salary-home/employee-salary-home.component';
import { SalaryHistoryComponent } from 'src/app/components/payroll/salary-history/salary-history.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeSalaryHomeComponent,
    children: [
      { path: 'edit/:id', component: EmployeeSalaryComponent },
      { path: 'payslip/:id', component: PayslipComponent },
      { path: 'salary-history/:id', component: SalaryHistoryComponent }
    ]
  },
  {
    path: 'salary-details/:id',
    component: SalaryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
