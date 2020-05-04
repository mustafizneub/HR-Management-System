import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ClientsComponent } from '../../components/clients/clients.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { UsersComponent } from '../../components/users/users.component';
import { AddClientsComponent } from '../../components/clients/add-clients/add-clients.component';
import { EditClientsComponent } from '../../components/clients/edit-clients/edit-clients.component';
import { AddProjectComponent } from '../../components/projects/add-project/add-project.component';
import { EditProjectsComponent } from '../../components/projects/edit-projects/edit-projects.component';
import { AddUsersComponent } from '../../components/users/add-users/add-users.component';
import { EditUsersComponent } from '../../components/users/edit-users/edit-users.component';
import { TaskComponent } from '../../components/task/task.component';
import { AddTaskComponent } from '../../components/task/add-task/add-task.component';
import { EditTaskComponent } from '../../components/task/edit-task/edit-task.component';
import { LeadComponent } from '../../components/lead/lead.component';
import { AddLeaveRequestsComponent } from '../../components/add-leave-requests/add-leave-requests.component';
import { ViewLeaveRequestsComponent } from '../../components/view-leave-requests/view-leave-requests.component';
import { AdminviewLeaverequestComponent } from '../../components/adminview-leaverequest/adminview-leaverequest.component';
import { AdminleaverequestComponent } from '../../components/adminleaverequest/adminleaverequest.component';
import { EditadminviewLeaverequestComponent } from '../../components/editadminview-leaverequest/editadminview-leaverequest.component';
import { EditemployeeviewLeaveRequestComponent } from '../../components/editemployeeview-leave-request/editemployeeview-leave-request.component';
import { AssignLeaverequestComponent } from '../../components/assign-leaverequest/assign-leaverequest.component';
import { ViewassignleaveComponent } from '../../components/viewassignleave/viewassignleave.component';
import { EditassignleaveComponent } from '../../components/editassignleave/editassignleave.component';
import { AddassignleaveComponent } from '../../components/addassignleave/addassignleave.component';
import { CreateadminComponent } from '../../components/createadmin/createadmin.component';
import { ViewadminleaveComponent } from '../../components/viewadminleave/viewadminleave.component';
import { AdminLeaverequestComponent } from '../../components/admin-leaverequest/admin-leaverequest.component';
import { EditadminLeaveComponent } from '../../components/editadmin-leave/editadmin-leave.component';
import { AdminleaveeditComponent } from '../../components/adminleaveedit/adminleaveedit.component';


// All Job Portal components 

import { CreateResumeComponent } from '../../components/job-create-resume/create-resume.component';
import { Template1Component } from '../../components/job-templates/template1/template1.component';
import { Template2Component } from '../../components/job-templates/template2/template2.component';
import { Template3Component } from '../../components/job-templates/template3/template3.component';
import { Template4Component } from '../../components/job-templates/template4/template4.component';
import { Template5Component } from '../../components/job-templates/template5/template5.component';
import { Template6Component } from '../../components/job-templates/template6/template6.component';
import { Template1CreateComponent } from '../../components/job-templates/template1/template1-create/template1-create.component';
import { Template2CreateComponent } from '../../components/job-templates/template2/template2-create/template2-create.component';
import { Template3CreateComponent } from '../../components/job-templates/template3/template3-create/template3-create.component';
import { Template4CreateComponent } from '../../components/job-templates/template4/template4-create/template4-create.component';
import { Template5CreateComponent } from '../../components/job-templates/template5/template5-create/template5-create.component';
import { Template6CreateComponent } from '../../components/job-templates/template6/template6-create/template6-create.component';
import { HomeComponent } from '../../components/job-admin/home/home.component';
import { AddComponent } from '../../components/job-admin/add/add.component';
import { ApplicantListComponent } from '../../components/job-admin/applicant-list/applicant-list.component';
import { ShortlistComponent } from '../../components/job-admin/shortlist/shortlist.component';
import { ViewPostComponent } from '../../components/job-admin/view-post/view-post.component';
import { ExpiredPostComponent } from '../../components/job-admin/expired-post/expired-post.component';
import { JobpostDescriptionComponent } from '../../components/job-admin/jobpost-description/jobpost-description.component';
import { JobpostUpdateComponent } from '../../components/job-admin/jobpost-update/jobpost-update.component';
import { CareerComponent } from '../../components/job-user/career/career.component';
import { QuizComponent } from '../../components/job-user/quiz/quiz.component';
import { UserHomeComponent } from '../../components/job-user/user-home/user-home.component';
import { JobDescriptionComponent } from '../../components/job-user/job-description/job-description.component';
import { MyJobComponent } from '../../components/job-user/my-job/my-job.component';



// Financial Section: Author: Ahmad Sharif

import { ExpenseComponent } from '../../components/expense/expense.component';
import { DepositComponent } from '../../components/deposit/deposit.component';
import { CategoryComponent } from '../../components/category/category.component';
import { DetailsComponent } from '../../components/details/details.component';
// import { GraphExpenseComponent } from '../../components/graph/graph-expense/graph-expense.component';

// DEPOSIT HOMECOMPONENT
import { FinancehomeComponent } from '../../components/finance-home/finance-home.component';


// Import canActivate guard services
import { AuthGuard } from "../../shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "../../shared/guard/secure-inner-pages.guard";

// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'sign-in/:msg', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'add-clients', component: AddClientsComponent, canActivate: [AuthGuard] },
  { path: 'edit-clients', component: EditClientsComponent, canActivate: [AuthGuard] },
  { path: 'add-project', component: AddProjectComponent, canActivate: [AuthGuard] },
  { path: 'edit-projects', component: EditProjectsComponent, canActivate: [AuthGuard] },
  { path: 'edit-clients/:id', component: EditClientsComponent, canActivate: [AuthGuard] },
  { path: 'edit-projects/:id', component: EditProjectsComponent, canActivate: [AuthGuard] },
  { path: 'edit-users/:id', component: EditUsersComponent, canActivate: [AuthGuard] },
  { path: 'add-users', component: AddUsersComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: 'edit-task', component: EditTaskComponent, canActivate: [AuthGuard] },
  { path: 'lead', component: LeadComponent, canActivate: [AuthGuard] },
  { path: 'add-leave-requests', component: AddLeaveRequestsComponent, canActivate: [AuthGuard] },
  { path: 'view-leave-requests', component: ViewLeaveRequestsComponent, canActivate: [AuthGuard] },
  { path: 'adminview-leaverequest', component: AdminviewLeaverequestComponent, canActivate: [AuthGuard] },
  { path: 'adminleaverequest', component: AdminleaverequestComponent, canActivate: [AuthGuard] },
  { path: 'editadminview-leavereques/:id', component: EditadminviewLeaverequestComponent, canActivate: [AuthGuard] },
  { path: 'editemployeeview-leave-request/:id', component: EditemployeeviewLeaveRequestComponent, canActivate: [AuthGuard] },
  { path: 'assign-leaverequest', component: AssignLeaverequestComponent, canActivate: [AuthGuard] },
  { path: 'viewassignleave/:id', component: ViewassignleaveComponent, canActivate: [AuthGuard] },
  { path: 'editassignleave/:id', component: EditassignleaveComponent, canActivate: [AuthGuard] },
  { path: 'addassignleave/:id', component: AddassignleaveComponent, canActivate: [AuthGuard] },
  { path: 'createadmin', component: CreateadminComponent, canActivate: [AuthGuard] },
  { path: 'viewadminleave', component: ViewadminleaveComponent, canActivate: [AuthGuard] },
  { path: 'admin-leaverequest', component: AdminLeaverequestComponent, canActivate: [AuthGuard] },
  { path: 'editadmin-leave/:id', component: EditadminLeaveComponent, canActivate: [AuthGuard] },
  { path: 'adminleaveedit/:id', component: AdminleaveeditComponent, canActivate: [AuthGuard] },








  // Job-portal Routes

  { path: 'create-resume', component: CreateResumeComponent },
  { path: 'templates/template1-view/:id', component: Template1Component },
  { path: 'template1-create', component: Template1CreateComponent },
  { path: 'templates/template2-view/:id', component: Template2Component },
  { path: 'template2-create', component: Template2CreateComponent },
  { path: 'templates/template3-view/:id', component: Template3Component },
  { path: 'template3-create', component: Template3CreateComponent },
  { path: 'templates/template4-view/:id', component: Template4Component },
  { path: 'template4-create', component: Template4CreateComponent },
  { path: 'templates/template5-view/:id', component: Template5Component },
  { path: 'template5-create', component: Template5CreateComponent },
  { path: 'templates/template6-view/:id', component: Template6Component },
  { path: 'template6-create', component: Template6CreateComponent },
  { path: 'admin-home', component: HomeComponent },
  { path: 'admin-add', component: AddComponent },
  { path: 'admin-view', component: ViewPostComponent },
  { path: 'admin-jobview/:id', component: JobpostDescriptionComponent },
  { path: 'admin-jobupdate/:id', component: JobpostUpdateComponent },
  { path: 'expired-post', component: ExpiredPostComponent },
  { path: 'admin-applicants/:id', component: ApplicantListComponent },
  { path: 'admin-shortlist/:id', component: ShortlistComponent },
  { path: 'career', component: CareerComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'job-description/:id', component: JobDescriptionComponent },
  { path: 'my-job', component: MyJobComponent },

  // Financial App: Author: Ahmad Sharif
  { path: 'home', component: FinancehomeComponent, pathMatch: 'full' },
  { path: 'expense', component: ExpenseComponent, pathMatch: 'full' },
  { path: 'deposit', component: DepositComponent, pathMatch: 'full' },
  // { path: 'graph/expense', component: GraphExpenseComponent, pathMatch: 'full'},        


  //############################################
  {
    path: 'employees/all-employee',
    loadChildren: () =>
      import('../../components/all-employees/all-employees.module')
        .then(m => m.AllEmployeesModule)
  },
  {
    path: 'employees/departments',
    loadChildren: () =>
      import('../../components/departments/departments.module')
        .then(m => m.DepartmentsModule)
  },
  {
    path: 'employees/designations',
    loadChildren: () =>
      import('../../components/designations/designations.module')
        .then(m => m.DesignationsModule)
  },
  {
    path: 'employees/leave-requests',
    loadChildren: () =>
      import('../../components/leave-requests/leave-requests.module')
        .then(m => m.LeaveRequestsModule)
  },
  {
    path: 'employees/holidays',
    loadChildren: () =>
      import('../../components/holidays/holidays.module')
        .then(m => m.HolidaysModule)
  },
  {
    path: 'jobs/managed-jobs',
    loadChildren: () =>
      import('../../components/managed-jobs/managed-jobs.module')
        .then(m => m.ManagedJobsModule)
  },
  {
    path: 'jobs/applied-jobs',
    loadChildren: () =>
      import('../../components/applied-jobs/applied-jobs.module')
        .then(m => m.AppliedJobsModule)
  },
  {
    path: 'payroll/employee-salary',
    loadChildren: () =>
      import('../../components/payroll/payroll.module')
        .then(m => m.PayrollModule)
  },
  {
    path: 'all-jobs',
    loadChildren: () =>
      import('../../components/jobs/jobs.module')
        .then(m => m.JobsModule)
  },
  { path: 'dashboard/:category/:categoryname', component: CategoryComponent, pathMatch: 'full' },
  { path: 'dashboard/:category/:categoryname/:objectId', component: DetailsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }