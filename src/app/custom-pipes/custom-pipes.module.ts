import { DaysAgoPipe } from './days-ago/days-ago.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayLeftPipe } from './day-left/day-left.pipe';



@NgModule({
  declarations: [DaysAgoPipe, DayLeftPipe],
  imports: [
    CommonModule
  ],
  exports: [DaysAgoPipe, DayLeftPipe]
})
export class CustomPipesModule { }
