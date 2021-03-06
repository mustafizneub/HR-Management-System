import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { TransactionService } from '../../../services/transaction/transaction.service';
import * as _ from 'lodash';

interface Total {
  deposit: number,
  expense: number,
  depositCategory: any,
  expenseCategory: any
}
@Component({
  selector: 'app-financeSummary',
  templateUrl: './finance-summary.component.html',
  styleUrls: ['./finance-summary.component.css']
})
export class FinanceSummaryComponent implements OnInit {
  total:Total = {
    deposit: 0,
    expense: 0,       
    depositCategory: null,
    expenseCategory: null,   
  }
                         
  constructor(private firestore: AngularFirestore, 
    private transactionService: TransactionService,
    public angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
      this.getTransactionSummary();
  }
  getTransactionSummary():void {

    this.transactionService.getTransactionSummary().subscribe(object => {

      object.forEach((item:any) => {
        if(item.expense_byCategory){
                var data = _.flatMap(item.expense_byCategory);
                var expense_data = [];
                for(var i = 0; i < data.length; i++) {
                  expense_data.push({
                    "name": data[i]['category'],
                    "value": data[i]['amount'],
                  })
                }
                this.total.expenseCategory = _.sortBy(expense_data, [function(o) { return o.value}]);
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
                  this.total.depositCategory = _.sortBy(deposit_data, [function(o) { return o.value}]);
          }

            if(item.expense_aggregate) {
              this.total.expense = item.expense_aggregate.amount;
            
            }
            if(item.deposit_aggregate) {
              this.total.deposit = item.deposit_aggregate.amount;
            }
      })
         
    })  
  }
} 