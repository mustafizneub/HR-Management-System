import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-graph-expense',
  templateUrl: './graph-expense.component.html',
  styleUrls: ['./graph-expense.component.css']
})
export class GraphExpenseComponent implements OnInit {
  
  graphData = {
    deposit: {
      data: [],
      xAxisLabel: 'Deposit Category',
      yAxisLabel: 'Deposit',
      colorScheme: {
        domain: ['#9dab86', '#e08f62', '#d7c79e']
      }
    },
    expense : {
      data: [],
      xAxisLabel:'Expenditure Category',
      yAxisLabel: 'Expenditure',
      colorScheme: {
        domain: ['#16817a', '#ffb385', '#00bcd4']
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
