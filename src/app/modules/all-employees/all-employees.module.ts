import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllEmployeesRoutingModule } from './all-employees-routing.module';
import { AllEmployeesHomeComponent } from './all-employees-home/all-employees-home.component';

import { EmployeeComponent } from './employee/employee.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@NgModule({
  declarations: [AllEmployeesHomeComponent, EmployeeComponent, EmployeeProfileComponent, AddEmployeeComponent],
  imports: [
    CommonModule,
    AllEmployeesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: []
})
export class AllEmployeesModule { }
