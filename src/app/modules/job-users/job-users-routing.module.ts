import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareerComponent } from './career/career.component';
import { QuizComponent } from './quiz/quiz.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { MyJobComponent } from './my-job/my-job.component';


const routes: Routes = [
  { path: 'career', component: CareerComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'job-description/:id', component: JobDescriptionComponent },
  { path: 'my-job', component: MyJobComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobUsersRoutingModule { }
