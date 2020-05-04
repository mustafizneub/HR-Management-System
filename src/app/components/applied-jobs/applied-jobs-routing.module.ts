import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppliedJobsHomeComponent } from './applied-jobs-home/applied-jobs-home.component';


const routes: Routes = [
  { path: '', component: AppliedJobsHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppliedJobsRoutingModule { }
