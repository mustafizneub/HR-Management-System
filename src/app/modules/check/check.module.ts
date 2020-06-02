import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckRoutingModule } from './check-routing.module';
import { CheckHomeComponent } from './check-home/check-home.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AttendanceRecordsComponent } from './attendance-records/attendance-records.component';
import { ExporttocsvComponent } from './exporttocsv/exporttocsv.component';


@NgModule({
  declarations: [CheckHomeComponent, CheckOutComponent, AttendanceRecordsComponent, ExporttocsvComponent],
  imports: [
    CommonModule,
    CheckRoutingModule
  ]
})
export class CheckModule { }
