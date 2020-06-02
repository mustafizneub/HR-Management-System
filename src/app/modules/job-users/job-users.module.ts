import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { JobUsersRoutingModule } from './job-users-routing.module';
import { CareerComponent } from './career/career.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { MyJobComponent } from './my-job/my-job.component';
import { QuizComponent } from './quiz/quiz.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CareerComponent,
    JobDescriptionComponent,
    MyJobComponent,
    QuizComponent,
    UserHomeComponent
  ],
  imports: [
    CommonModule,
    JobUsersRoutingModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule
  ]
})
export class JobUsersModule { }
