import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagedJobsHomeComponent } from './managed-jobs-home/managed-jobs-home.component';
import { ManagedJobComponent } from './managed-job/managed-job.component';


const routes: Routes = [
  {
    path: '', component: ManagedJobsHomeComponent,
    children: [
      { path: 'edit/:id', component: ManagedJobComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagedJobsRoutingModule { }
