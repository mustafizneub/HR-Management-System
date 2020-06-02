import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction/transaction.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  
  graphData = {
    deposit: {
      data: [],
      xAxisLabel: 'Deposit Category',
      yAxisLabel: 'Deposit',
      colorScheme: {
        domain: ['#0083c2', '#fdb813', '#ff6d37']
      }
    },
    expense : {
      data: [],
      xAxisLabel:'Expenditure Category',
      yAxisLabel: 'Expenditure',
      colorScheme: {
        domain: ['#fdb813', '#17a2b8', '#8BC34A', '#0083c2']
      }
    }
  }
  view: any[] = [450, 300];
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;

  gradient: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {

      this.transactionService.getTransactionSummary().subscribe((object:any)=> {
          var data = object.forEach((item:any) => {
                if(item.expense_byCategory){
                    var data = _.flatMap(item.expense_byCategory);
                    var expense_data = [];
                    for(var i = 0; i < data.length; i++) {
                      expense_data.push({
                        "name": data[i]['category'],
                        "value": data[i]['amount'],
                      })
                    }
                    this.graphData.expense.data = _.sortBy(expense_data, [function(o) { return o.value}]);
                }

                if(item.deposit_byCategory){
                  var data = _.flatMap(item.deposit_byCategory);
                  var deposit_data = [];
                  for(var i = 0; i < data.length; i++) {
                    deposit_data.push({
                      "name": data[i]['category'],
                      "value": data[i]['amount'],
                    })
                  }
                  this.graphData.deposit.data = _.sortBy(deposit_data, [function(o) { return o.value}]).reverse();
              }
          });
      })

  }

}
