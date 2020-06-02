import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseComponent } from './expense/expense.component';
import { DepositComponent } from './deposit/deposit.component';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './details/details.component';
import { ReportComponent } from './report/report.component';
import { FinanceSummaryComponent } from './finance-summary/finance-summary.component';



const routes: Routes = [
    {path: 'summary', component: FinanceSummaryComponent, pathMatch: 'full'},
    {path: 'expense', component: ExpenseComponent, pathMatch: 'full'},
    {path: 'deposit', component: DepositComponent, pathMatch: 'full'},
    {path: 'graph', component: ReportComponent, pathMatch: 'full'},
    {path: ':category/:categoryname', component: CategoryComponent, pathMatch: 'full'},
    {path: ':category/:categoryname/:objectId', component: DetailsComponent, pathMatch: 'full'}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
