import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HolidaysRoutingModule } from './holidays-routing.module';
import { HolidaysHomeComponent } from './holidays-home/holidays-home.component';
import { HolidayComponent } from './holiday/holiday.component';


@NgModule({
  declarations: [HolidaysHomeComponent, HolidayComponent],
  imports: [
    CommonModule,
    HolidaysRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HolidaysModule { }
