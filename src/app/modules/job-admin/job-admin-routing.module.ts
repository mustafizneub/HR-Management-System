import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { JobpostDescriptionComponent } from './jobpost-description/jobpost-description.component';
import { JobpostUpdateComponent } from './jobpost-update/jobpost-update.component';
import { ExpiredPostComponent } from './expired-post/expired-post.component';
import { ApplicantListComponent } from './applicant-list/applicant-list.component';
import { ShortlistComponent } from './shortlist/shortlist.component';


const routes: Routes = [
  { path: 'admin-home', component: HomeComponent },
  { path: 'admin-add', component: AddComponent },
  { path: 'admin-view', component: ViewPostComponent },
  { path: 'admin-jobview/:id', component: JobpostDescriptionComponent },
  { path: 'admin-jobupdate/:id', component: JobpostUpdateComponent },
  { path: 'expired-post', component: ExpiredPostComponent },
  { path: 'admin-applicants/:id', component: ApplicantListComponent },
  { path: 'admin-shortlist/:id', component: ShortlistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobAdminRoutingModule { }
