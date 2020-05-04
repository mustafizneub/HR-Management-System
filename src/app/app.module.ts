import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



// Reactive Form
import { ReactiveFormsModule } from "@angular/forms";


// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UsersComponent } from './components/users/users.component';
import { AddClientsComponent } from './components/clients/add-clients/add-clients.component';
import { EditClientsComponent } from './components/clients/edit-clients/edit-clients.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { EditProjectsComponent } from './components/projects/edit-projects/edit-projects.component';
import { AddUsersComponent } from './components/users/add-users/add-users.component';
import { EditUsersComponent } from './components/users/edit-users/edit-users.component';
import { TaskComponent } from './components/task/task.component';
import { AddTaskComponent } from './components/task/add-task/add-task.component';
import { EditTaskComponent } from './components/task/edit-task/edit-task.component';
import { LeadComponent } from './components/lead/lead.component';


// job-portal component start
import { CreateResumeComponent } from './components/job-create-resume/create-resume.component';
import { NavComponent } from './components/job-nav/nav.component';
import { Template1Component } from './components/job-templates/template1/template1.component';
import { Template2Component } from './components/job-templates/template2/template2.component';
import { Template3Component } from './components/job-templates/template3/template3.component';
import { Template4Component } from './components/job-templates/template4/template4.component';
import { Template5Component } from './components/job-templates/template5/template5.component';
import { Template6Component } from './components/job-templates/template6/template6.component';
import { Template1CreateComponent } from './components/job-templates/template1/template1-create/template1-create.component';
import { Template2CreateComponent } from './components/job-templates/template2/template2-create/template2-create.component';
import { Template3CreateComponent } from './components/job-templates/template3/template3-create/template3-create.component';
import { Template4CreateComponent } from './components/job-templates/template4/template4-create/template4-create.component';
import { Template5CreateComponent } from './components/job-templates/template5/template5-create/template5-create.component';
import { Template6CreateComponent } from './components/job-templates/template6/template6-create/template6-create.component';
import { HomeComponent } from './components/job-admin/home/home.component';
import { AddComponent } from './components/job-admin/add/add.component';
import { ApplicantListComponent } from './components/job-admin/applicant-list/applicant-list.component';
import { ShortlistComponent } from './components/job-admin/shortlist/shortlist.component';
import { CareerComponent } from './components/job-user/career/career.component';
import { QuizComponent } from './components/job-user/quiz/quiz.component';
import { ViewPostComponent } from './components/job-admin/view-post/view-post.component';
import { UserHomeComponent } from './components/job-user/user-home/user-home.component';
import { JobDescriptionComponent } from './components/job-user/job-description/job-description.component';
import { ExpiredPostComponent } from './components/job-admin/expired-post/expired-post.component';
import { MyJobComponent } from './components/job-user/my-job/my-job.component';
import { JobpostDescriptionComponent } from './components/job-admin/jobpost-description/jobpost-description.component';
import { JobpostUpdateComponent } from './components/job-admin/jobpost-update/jobpost-update.component';



// Job portal component End

// Financial Section: Author: Ahmad Sharif

import { ExpenseComponent } from './components/expense/expense.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { CategoryComponent } from './components/category/category.component';
import { DetailsComponent } from './components/details/details.component';
// import { GraphExpenseComponent } from './components/graph/graph-expense/graph-expense.component';

// DEPOSITHOMECOMPONENT

import { FinancehomeComponent } from './components/finance-home/finance-home.component';


import { AdminleaverequestComponent } from './components/adminleaverequest/adminleaverequest.component';
import { AdminviewLeaverequestComponent } from './components/adminview-leaverequest/adminview-leaverequest.component';
import { EditadminviewLeaverequestComponent } from './components/editadminview-leaverequest/editadminview-leaverequest.component';
import { EditemployeeviewLeaveRequestComponent } from './components/editemployeeview-leave-request/editemployeeview-leave-request.component';
import { AddLeaveRequestsComponent } from './components/add-leave-requests/add-leave-requests.component';
import { ViewLeaveRequestsComponent } from './components/view-leave-requests/view-leave-requests.component';
import { AssignLeaverequestComponent } from './components/assign-leaverequest/assign-leaverequest.component';
import { ViewassignleaveComponent } from './components/viewassignleave/viewassignleave.component';
import { EditassignleaveComponent } from './components/editassignleave/editassignleave.component';
import { AddassignleaveComponent } from './components/addassignleave/addassignleave.component';
import { CreateadminComponent } from './components/createadmin/createadmin.component';
import { ViewadminleaveComponent } from './components/viewadminleave/viewadminleave.component';
import { AdminLeaverequestComponent } from './components/admin-leaverequest/admin-leaverequest.component';
import { EditadminLeaveComponent } from './components/editadmin-leave/editadmin-leave.component';
import { AdminleaveeditComponent } from './components/adminleaveedit/adminleaveedit.component';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import 'firebase/storage';

// Auth service
import { AuthService } from "./services/auth.service";

// Ng2SearchPipeModule
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// import for work ng2searchpipemodule
import { FormsModule } from '@angular/forms';

// import for pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { AddProjectsComponent } from './projects/add-projects/add-projects.component';

// import for show successful message
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlashMessagesModule } from 'angular2-flash-messages';

// ng bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// for multi select
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

//semantic ui
import { SuiModule } from 'ng2-semantic-ui';

import { CookieService } from 'ngx-cookie-service';


//##############
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { HttpClientModule } from '@angular/common/http';


// semantic ui



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    ClientsComponent,
    ProjectsComponent,
    UsersComponent,
    AddClientsComponent,
    EditClientsComponent,
    AddProjectComponent,
    EditProjectsComponent,
    AddProjectsComponent,
    AddUsersComponent,
    EditUsersComponent,
    TaskComponent,
    AddTaskComponent,
    EditTaskComponent,
    LeadComponent,

    //job portal 
    CreateResumeComponent,
    NavComponent,
    Template1Component,
    Template2Component,
    Template3Component,
    Template4Component,
    Template5Component,
    Template6Component,
    Template1CreateComponent,
    Template2CreateComponent,
    Template3CreateComponent,
    Template4CreateComponent,
    Template5CreateComponent,
    Template6CreateComponent,
    HomeComponent,
    AddComponent,
    ApplicantListComponent,
    ShortlistComponent,
    CareerComponent,
    QuizComponent,
    ViewPostComponent,
    UserHomeComponent,
    JobDescriptionComponent,
    ExpiredPostComponent,
    MyJobComponent,
    JobpostDescriptionComponent,
    JobpostUpdateComponent,

    // Financial App Component: Author: Ahmad Sharif
    ExpenseComponent,
    DepositComponent,
    CategoryComponent,
    DetailsComponent,
    // GraphExpenseComponent,
    FinancehomeComponent,

    ViewLeaveRequestsComponent,
    AddLeaveRequestsComponent,
    AdminviewLeaverequestComponent,
    AdminleaverequestComponent,
    EditadminviewLeaverequestComponent,
    EditemployeeviewLeaveRequestComponent,
    AssignLeaverequestComponent,
    ViewassignleaveComponent,
    EditassignleaveComponent,
    AddassignleaveComponent,
    CreateadminComponent,
    ViewadminleaveComponent,
    AdminLeaverequestComponent,
    EditadminLeaveComponent,
    AdminleaveeditComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FlashMessagesModule.forRoot(),
    NgbModule,
    AngularFireAuthModule,
    NgMultiSelectDropDownModule.forRoot(),


    // #########################
    AngularFirestoreModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'mihrab-miah' }),
    HttpClientModule

  ],
  providers: [AuthService, CookieService],
  bootstrap: [AppComponent]
})

export class AppModule { }