import { DepartmentComponent } from './department/department.component';
import { DepartmentsHomeComponent } from './departments-home/departments-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: DepartmentsHomeComponent,
    children: [
      { path: 'edit/:id', component: DepartmentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
