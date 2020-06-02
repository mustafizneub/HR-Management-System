import { HolidayComponent } from './holiday/holiday.component';
import { HolidaysHomeComponent } from './holidays-home/holidays-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: HolidaysHomeComponent,
    children: [
      { path: 'edit/:id', component: HolidayComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidaysRoutingModule { }
