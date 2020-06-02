import { CustomPipesModule } from './../custom-pipes/custom-pipes.module';
import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskDetailsComponent } from './task-details/task-details.component';
@NgModule({
  declarations: [TaskComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CustomPipesModule
  ]
})
export class TasksModule { }
