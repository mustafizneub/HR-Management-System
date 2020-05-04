import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DesignationsRoutingModule } from './../designations/designations-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationsHomeComponent } from './designations-home/designations-home.component';
import { DesignationComponent } from './designation/designation.component';



@NgModule({
  declarations: [DesignationsHomeComponent, DesignationComponent],
  imports: [
    DesignationsRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DesignationsModule { }
