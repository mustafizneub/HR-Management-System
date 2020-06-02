import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { JobAdminRoutingModule } from './job-admin-routing.module';
import { AddComponent } from './add/add.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { HomeComponent } from './home/home.component';
import { JobpostDescriptionComponent } from './jobpost-description/jobpost-description.component';
import { JobpostUpdateComponent } from './jobpost-update/jobpost-update.component';
import { ShortlistComponent } from './shortlist/shortlist.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { ExpiredPostComponent } from './expired-post/expired-post.component';


@NgModule({
  declarations: [
    AddComponent,
    ApplicantListComponent,
    HomeComponent,
    JobpostDescriptionComponent,
    JobpostUpdateComponent,
    ShortlistComponent,
    ViewPostComponent,
    ExpiredPostComponent
  ],
  imports: [
    CommonModule,
    JobAdminRoutingModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgxPaginationModule,
    HttpClientModule,
    AngularEditorModule
  ]
})
export class JobAdminModule { }
