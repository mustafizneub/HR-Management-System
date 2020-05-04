import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllEmployeesHomeComponent } from './all-employees-home/all-employees-home.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';


const routes: Routes = [
  {
    path: '',
    component: AllEmployeesHomeComponent,
    children: [
      { path: 'edit/:id', component: EmployeeComponent },
      { path: 'profile/:id', component: EmployeeProfileComponent },
      { path: 'add-employee', component: AddEmployeeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllEmployeesRoutingModule { }
