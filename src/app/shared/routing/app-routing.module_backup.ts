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


// Financial Section: Author: Ahmad Sharif

import { ExpenseComponent } from '../../components/expense/expense.component';
import { DepositComponent } from '../../components/deposit/deposit.component';
import { CategoryComponent } from '../../components/category/category.component';
import { DetailsComponent } from '../../components/details/details.component';
// import { GraphExpenseComponent } from '../../components/graph/graph-expense/graph-expense.component';
import { HomeComponent } from '../../components/home/home.component';


// Import canActivate guard services
import { AuthGuard } from "../../shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "../../shared/guard/secure-inner-pages.guard";

// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
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
  { path: 'add-users', component: AddUsersComponent, canActivate: [AuthGuard] },
  { path: 'edit-users/:id', component: EditUsersComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'add-task', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: 'edit-task', component: EditTaskComponent, canActivate: [AuthGuard] },
  { path: 'lead', component: LeadComponent, canActivate: [AuthGuard] },
  
  // Financial App: Author: Ahmad Sharif
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'expense', component: ExpenseComponent, pathMatch: 'full'},
  { path: 'deposit', component: DepositComponent, pathMatch: 'full'},        
 // { path: 'graph/expense', component: GraphExpenseComponent, pathMatch: 'full'},        
  { path: ':category/:categoryname', component: CategoryComponent, pathMatch: 'full'},        
  { path: ':category/:categoryname/:objectId', component: DetailsComponent, pathMatch: 'full'},    

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }