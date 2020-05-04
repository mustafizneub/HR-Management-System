import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppliedJobsRoutingModule } from './applied-jobs-routing.module';
import { AppliedJobsHomeComponent } from './applied-jobs-home/applied-jobs-home.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AppliedJobsHomeComponent],
  imports: [
    CommonModule,
    AppliedJobsRoutingModule,
    SharedModule
  ]
})
export class AppliedJobsModule { }
