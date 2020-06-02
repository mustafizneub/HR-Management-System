import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';


// import { FinanceModule } from '../app/modules/finance/finance.module';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import 'firebase/storage';
// import for pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { HttpClientModule } from '@angular/common/http';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Ng2SearchPipeModule
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import for pagination
import { DatePipe } from '@angular/common'



import { ClientsComponent } from 'src/app/modules/clients/clients/clients.component';
import { ProjectsComponent } from 'src/app/modules/projects/projects/projects.component';
import { AddClientsComponent } from 'src/app/modules/clients/add-clients/add-clients.component';
import { EditClientsComponent } from 'src/app/modules/clients/edit-clients/edit-clients.component';
import { AddProjectComponent } from 'src/app/modules/projects/add-project/add-project.component';
import { EditProjectsComponent } from 'src/app/modules/projects/edit-projects/edit-projects.component';
import { AddTaskComponent } from 'src/app/modules/tasks/add-task/add-task.component';
import { EditTaskComponent } from 'src/app/modules/tasks/edit-task/edit-task.component';


import { AdminleaverequestComponent } from 'src/app/modules/leave-request/adminleaverequest/adminleaverequest.component';
import { AdminviewLeaverequestComponent } from 'src/app/modules/leave-request/adminview-leaverequest/adminview-leaverequest.component';
import { EditadminviewLeaverequestComponent } from 'src/app/modules/leave-request/editadminview-leaverequest/editadminview-leaverequest.component';
import { EditemployeeviewLeaveRequestComponent } from 'src/app/modules/leave-request/editemployeeview-leave-request/editemployeeview-leave-request.component';

import { AssignLeaverequestComponent } from 'src/app/modules/leave-request/assign-leaverequest/assign-leaverequest.component';
import { ViewassignleaveComponent } from 'src/app/modules/leave-request/viewassignleave/viewassignleave.component';
import { EditassignleaveComponent } from 'src/app/modules/leave-request/editassignleave/editassignleave.component';
import { AddassignleaveComponent } from 'src/app/modules/leave-request/addassignleave/addassignleave.component';
import { AdminLeaverequestComponent } from 'src/app/modules/leave-request/admin-leaverequest/admin-leaverequest.component';
import { EditadminLeaveComponent } from 'src/app/modules/leave-request/editadmin-leave/editadmin-leave.component';
import { AdminleaveeditComponent } from 'src/app/modules/leave-request/adminleaveedit/adminleaveedit.component';
import { MyInfoComponent } from 'src/app/modules/my-info/my-info/my-info.component';



import { AddLeaveRequestsComponent } from 'src/app/modules/leave-request/add-leave-requests/add-leave-requests.component';
import { ViewLeaveRequestsComponent } from 'src/app/modules/leave-request/view-leave-requests/view-leave-requests.component';

import { CheckHomeComponent } from 'src/app/modules/check/check-home/check-home.component';
import { CheckOutComponent } from 'src/app/modules/check/check-out/check-out.component';
import { AttendanceRecordsComponent } from 'src/app/modules/check/attendance-records/attendance-records.component';
import { ExporttocsvComponent } from 'src/app/modules/check/exporttocsv/exporttocsv.component';






import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from '@angular/fire/storage';
import 'firebase/storage';
import { ProjectsModule } from './modules/projects/projects.module';


/* Included By Ahmad Sharif */
import { FinanceModule } from '../app/modules/finance/finance.module';
import { NoticeListComponent } from 'src/app/modules/notice/notice-list/notice-list.component';
import { NoticeBoardComponent } from 'src/app/modules/notice/notice-board/notice-board.component';
import { NoticeViewComponent } from 'src/app/modules/notice/notice-view/notice-view.component';
import { EmployeeComponent } from 'src/app/modules/report-leave/employee/employee.component';
import { AttendenceDetailComponent } from 'src/app/modules/report-leave/details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    AddLeaveRequestsComponent,
    ViewLeaveRequestsComponent,
    ClientsComponent,
    ProjectsComponent,
    AddClientsComponent,
    EditClientsComponent,
    AddProjectComponent,
    EditProjectsComponent,
    AddTaskComponent,
    EditTaskComponent,
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
    AdminLeaverequestComponent,
    EditadminLeaveComponent,
    AdminleaveeditComponent,
    MyInfoComponent,
    CheckHomeComponent,
    CheckOutComponent,
    AttendanceRecordsComponent,
    ExporttocsvComponent,
    NoticeListComponent,
    NoticeBoardComponent,
    NoticeViewComponent,
    EmployeeComponent,
    AttendenceDetailComponent

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'mihrab-miah' }),
    HttpClientModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    NgbModule,
    NgxChartsModule,
    FormsModule,
    FinanceModule,

    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ProjectsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

