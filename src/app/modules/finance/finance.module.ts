import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


import { FinanceRoutingModule } from './finance-routing.module';
import { ExpenseComponent } from './expense/expense.component';
import { DepositComponent } from './deposit/deposit.component';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './details/details.component';
import { ReportComponent } from './report/report.component';
import { FinanceSummaryComponent } from './finance-summary/finance-summary.component';


@NgModule({
  declarations: [
  ExpenseComponent, 
  DepositComponent, 
  CategoryComponent, 
  DetailsComponent, 
  ReportComponent, 
  FinanceSummaryComponent, 
],
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    FinanceRoutingModule,
    NgbModule,
    NgxPaginationModule,    
  ]
})
export class FinanceModule { }
