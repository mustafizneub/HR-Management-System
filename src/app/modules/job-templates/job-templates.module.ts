import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { JobTemplatesRoutingModule } from './job-templates-routing.module';
import { CreateResumeComponent } from './job-create-resume/create-resume.component';
import { NavComponent } from './job-nav/nav.component';
import { Template1Component } from './template1/template1.component';
import { Template1CreateComponent } from './template1/template1-create/template1-create.component';
import { Template2Component } from './template2/template2.component';
import { Template2CreateComponent } from './template2/template2-create/template2-create.component';
import { Template3Component } from './template3/template3.component';
import { Template3CreateComponent } from './template3/template3-create/template3-create.component';
import { Template4Component } from './template4/template4.component';
import { Template4CreateComponent } from './template4/template4-create/template4-create.component';
import { Template5Component } from './template5/template5.component';
import { Template5CreateComponent } from './template5/template5-create/template5-create.component';
import { Template6Component } from './template6/template6.component';
import { Template6CreateComponent } from './template6/template6-create/template6-create.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateResumeComponent,
    NavComponent,
    Template1Component,
    Template1CreateComponent,
    Template2Component,
    Template2CreateComponent,
    Template3Component,
    Template3CreateComponent,
    Template4Component,
    Template4CreateComponent,
    Template5Component,
    Template5CreateComponent,
    Template6Component,
    Template6CreateComponent
  ],
  imports: [
    CommonModule,
    JobTemplatesRoutingModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    FormsModule
  ]
})
export class JobTemplatesModule { }
