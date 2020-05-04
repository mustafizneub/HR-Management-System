import { ReactiveFormsModule } from '@angular/forms';
import { CustomPipesModule } from 'src/app/custom-pipes/custom-pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsHomeComponent } from './jobs-home/jobs-home.component';
import { JobComponent } from './job/job.component';
import { JobCardComponent } from './job-card/job-card.component';
import { ApplyToJobComponent } from './apply-to-job/apply-to-job.component';


@NgModule({
  declarations: [JobsHomeComponent, JobComponent, JobCardComponent, ApplyToJobComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    CustomPipesModule,
    ReactiveFormsModule
  ]
})
export class JobsModule { }
