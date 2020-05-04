import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagedJobsRoutingModule } from './managed-jobs-routing.module';
import { ManagedJobsHomeComponent } from './managed-jobs-home/managed-jobs-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagedJobComponent } from './managed-job/managed-job.component';


@NgModule({
  declarations: [ManagedJobsHomeComponent, ManagedJobComponent],
  imports: [
    CommonModule,
    ManagedJobsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ManagedJobsModule { }
