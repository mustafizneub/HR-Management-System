import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { PolicyComponent } from './policy/policy.component';
import { PendingPolicyComponent } from './pending-policy/pending-policy.component';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [PolicyComponent, PendingPolicyComponent, AddPolicyComponent],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    AngularEditorModule
  ]
})
export class PolicyModule { }
