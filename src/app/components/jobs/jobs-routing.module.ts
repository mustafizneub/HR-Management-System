import { ApplyToJobComponent } from './apply-to-job/apply-to-job.component';
import { JobComponent } from './job/job.component';
import { JobsHomeComponent } from './jobs-home/jobs-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: JobsHomeComponent,
    children: [
      {
        path: 'details/:id', component: JobComponent
      }
    ]
  },
  {
    path: 'details/:id/apply', component: ApplyToJobComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
