import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyInfoRoutingModule } from './my-info-routing.module';
import { MyInfoComponent } from './my-info/my-info.component';


@NgModule({
  declarations: [MyInfoComponent],
  imports: [
    CommonModule,
    MyInfoRoutingModule
  ]
})
export class MyInfoModule { }
