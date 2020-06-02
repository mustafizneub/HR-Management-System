import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { AngularFireStorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
