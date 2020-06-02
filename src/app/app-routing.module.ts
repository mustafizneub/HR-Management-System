import { TaskDetailsComponent } from './modules/tasks/task-details/task-details.component';
import { TaskComponent } from './modules/tasks/task/task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLeaveRequestsComponent } from 'src/app/modules/leave-request/add-leave-requests/add-leave-requests.component';
import { ViewLeaveRequestsComponent } from 'src/app/modules/leave-request/view-leave-requests/view-leave-requests.component';

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
import { CheckHomeComponent } from 'src/app/modules/check/check-home/check-home.component';
import { ReportHomeComponent } from 'src/app/modules/report/report-home/report-home.component';
import { CheckOutComponent } from 'src/app/modules/check/check-out/check-out.component';
import { AttendanceRecordsComponent } from 'src/app/modules/check/attendance-records/attendance-records.component';
import { ExporttocsvComponent } from 'src/app/modules/check/exporttocsv/exporttocsv.component';

/* Inicluded by Ahmad Sharif */
import { NoticeListComponent } from 'src/app/modules/notice/notice-list/notice-list.component';
import { NoticeBoardComponent } from 'src/app/modules/notice/notice-board/notice-board.component';
import { NoticeViewComponent } from 'src/app/modules/notice/notice-view/notice-view.component';

import { EmployeeComponent } from 'src/app/modules/report-leave/employee/employee.component';
import { AttendenceDetailComponent } from 'src/app/modules/report-leave/details/details.component';

const routes: Routes = [
  { path: 'add-leave-requests', component: AddLeaveRequestsComponent },
  { path: 'view-leave-requests', component: ViewLeaveRequestsComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'project/:id', component: TaskComponent },
  { path: 'add-clients', component: AddClientsComponent },
  { path: 'edit-clients', component: EditClientsComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'edit-projects', component: EditProjectsComponent },
  { path: 'edit-clients/:id', component: EditClientsComponent },
  { path: 'edit-projects/:id', component: EditProjectsComponent },
  { path: 'task/:id', component: TaskComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'edit-task', component: EditTaskComponent },
  { path: 'add-leave-requests', component: AddLeaveRequestsComponent },
  { path: 'view-leave-requests', component: ViewLeaveRequestsComponent },
  { path: 'adminview-leaverequest', component: AdminviewLeaverequestComponent },
  { path: 'adminleaverequest', component: AdminleaverequestComponent },
  { path: 'editadminview-leavereques/:id', component: EditadminviewLeaverequestComponent },
  { path: 'editemployeeview-leave-request/:id', component: EditemployeeviewLeaveRequestComponent },
  { path: 'assign-leaverequest', component: AssignLeaverequestComponent },
  { path: 'viewassignleave/:id', component: ViewassignleaveComponent },
  { path: 'editassignleave/:id', component: EditassignleaveComponent },
  { path: 'addassignleave/:id', component: AddassignleaveComponent },

  { path: 'admin-leaverequest', component: AdminLeaverequestComponent },
  { path: 'editadmin-leave/:id', component: EditadminLeaveComponent },
  { path: 'adminleaveedit/:id', component: AdminleaveeditComponent },

  { path: 'notice/list', component: NoticeListComponent },
  { path: 'notice/board', component: NoticeBoardComponent },
  { path: 'notice/:id', component: NoticeViewComponent },
  { path: 'report/employee', component: EmployeeComponent },
  { path: 'report/employee/:id', component: AttendenceDetailComponent },


  // Job, Templates and Policy section Routes

  {
    path: 'policy', loadChildren: () => import('./modules/policy/policy.module')
      .then(m => m.PolicyModule)
  },

  {
    path: 'templates', loadChildren: () => import('./modules/job-templates/job-templates.module')
     .then(m=>m.JobTemplatesModule)
  },

  {
    path: 'admin', loadChildren: () => import('./modules/job-admin/job-admin.module')
      .then(m=>m.JobAdminModule)
  },
  {
    path: 'user', loadChildren: () => import('./modules/job-users/job-users.module')
      .then(m=>m.JobUsersModule)
  },
  
  //############################################
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module')
        .then(m => m.DashboardModule)
  },
  {
    path: 'employees/all-employee',
    loadChildren: () =>
      import('./modules/all-employees/all-employees.module')
        .then(m => m.AllEmployeesModule)
  },
  {
    path: 'employees/departments',
    loadChildren: () =>
      import('./modules/departments/departments.module')
        .then(m => m.DepartmentsModule)
  },
  {
    path: 'employees/designations',
    loadChildren: () =>
      import('./modules/designations/designations.module')
        .then(m => m.DesignationsModule)
  },
  {
    path: 'employees/holidays',
    loadChildren: () =>
      import('./modules/holidays/holidays.module')
        .then(m => m.HolidaysModule)
  },
  {
    path: 'payroll/employee-salary',
    loadChildren: () =>
      import('./modules/payroll/payroll.module')
        .then(m => m.PayrollModule)
  },
  {
    path: 'finance',
    loadChildren: () =>
      import('./modules/finance/finance.module')
        .then(m => m.FinanceModule)
  },
  {
    path: 'project/:id',
    loadChildren: () =>
      import('./modules/tasks/tasks.module')
        .then(m => m.TasksModule)
  },
  {
    path: 'task-details/:id',
    component: TaskDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }