import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRequestsRoutingModule } from './leave-requests-routing.module';
import { LeaveRequestsHomeComponent } from './leave-requests-home/leave-requests-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddLeaveRequestsComponent } from './add-leave-requests/add-leave-requests.component';
import { ViewLeaveRequestsComponent } from './view-leave-requests/view-leave-requests.component';


@NgModule({
  declarations: [LeaveRequestsHomeComponent, AddLeaveRequestsComponent, ViewLeaveRequestsComponent],
  imports: [
    CommonModule,
    LeaveRequestsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class LeaveRequestsModule { }
