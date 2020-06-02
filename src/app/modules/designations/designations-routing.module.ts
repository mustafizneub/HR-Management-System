import { DesignationComponent } from './designation/designation.component';
import { DesignationsHomeComponent } from './../designations/designations-home/designations-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: DesignationsHomeComponent,
    children: [
      { path: 'edit/:id', component: DesignationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationsRoutingModule { }
