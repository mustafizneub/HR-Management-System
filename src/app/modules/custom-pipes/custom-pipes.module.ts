import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayLeftPipe } from './day-left/day-left.pipe';



@NgModule({
  declarations: [DayLeftPipe],
  imports: [
    CommonModule
  ],
  exports: [DayLeftPipe]

})
export class CustomPipesModule { }
