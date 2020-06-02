import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LeaveRequestRoutingModule } from './leave-request-routing.module';
import { AddLeaveRequestsComponent } from 'src/app/modules/leave-request/add-leave-requests/add-leave-requests.component';
import { ViewLeaveRequestsComponent } from 'src/app/modules/leave-request/view-leave-requests/view-leave-requests.component';
import { ReactiveFormsModule } from "@angular/forms";
// Ng2SearchPipeModule
//import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import for work ng2searchpipemodule
import { FormsModule } from '@angular/forms';
// import for pagination
//import { NgxPaginationModule } from 'ngx-pagination';
// ng bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  declarations: [AddLeaveRequestsComponent, ViewLeaveRequestsComponent],
  imports: [
    CommonModule,
    LeaveRequestRoutingModule,
    //  Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    // NgxPaginationModule,
    NgbModule,

  ]
})
export class LeaveRequestModule { }
