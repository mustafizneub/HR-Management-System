import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';

interface Expense {
  amount: string,
  date: object,
  category: string,
  subcategory: string,
  subcategory_others: string,
  note: string
}
interface TallySummary {
  expense_aggregate: object,
  expense_byCategory: object,
}
interface SortedIcon {
    amount: {
      icon: string,
      order: boolean
    },
    category: {
      icon: string,
      order: boolean
    },
    userdate_ms: {
      icon: string,
      order: boolean
    }
}
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})

export class ExpenseComponent implements OnInit {

  tallySummary: TallySummary = {
    expense_aggregate: {},
    expense_byCategory: {}
  }
  sortedIcon: SortedIcon = {
    amount: {
      icon: 'chevron down icon',
      order: true,
    },
    category: {
      icon: 'chevron down icon',
      order: true,
    },
    userdate_ms: {
      icon: 'chevron down icon',
      order: true,
    }
  };

  expenses:any;
  totalExpense:any = 0;
  notification:any;
  subcategory:string;
  sub_others:boolean = false;
  selected_day:any = {
    year: new Date().getFullYear(), 
    month: new Date().getMonth() + 1, 
    day: new Date().getDate()
  };
  p: number = 1;
  placement = 'bottom';
  range:any = {
    prevdate: {
      year: new Date().getFullYear(), 
      month: new Date().getMonth() + 1, 
      day: new Date().getDate()
    },
    nextdate: {
      year: new Date().getFullYear(), 
      month: new Date().getMonth() + 1, 
      day: new Date().getDate() + 7
    }
  }
  isCollapsed:boolean = true;

  expense:Expense = {
    amount: '',
    date: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
    category: '',
    subcategory: '',
    subcategory_others: '',
    note: '',
  }
  
  constructor(
    private firestore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    private router: Router,
    private transactionService: TransactionService
    ) {}
  getDataSort(sorting_type:any) {
    var sortingType = sorting_type;
    this.sortedIcon[sortingType].order =! this.sortedIcon[sortingType].order;
    if(this.sortedIcon[sortingType].order) {
      var sortedDataDesc = _.sortBy(this.expenses, [function(o) { return o.expense[sortingType]}]);
      this.expenses = sortedDataDesc;
      this.sortedIcon[sorting_type].icon = 'chevron down icon';
    }
    else {
        var sortedDataAsc = _.sortBy(this.expenses, [function(o) { return o.expense[sortingType];}]).reverse();
        this.expenses = sortedDataAsc;
        this.sortedIcon[sorting_type].icon = 'chevron up icon';
    }
 }
  ngOnInit(): void {

    this.totalExpense = 0;
    this.firestore.collection('Tally', ref => ref.orderBy('expense.datetime')).valueChanges().subscribe(object=> {
        this.expenses = object;
    }, error => {

    });
     
  this.getTotalExpense();
   
} 
              
     
getTotalExpense() {
  this.transactionService.getTransactionSummary().subscribe(object => {
    object.forEach((item:any) => {
              if(item.expense_aggregate) {
                this.totalExpense = this.tallySummary.expense_aggregate = item.expense_aggregate.amount;
              }
              if(item.expense_byCategory) {
                  this.tallySummary.expense_byCategory = item.expense_byCategory;
              }
    })
        
  }, (error)=> {
    this.totalExpense = 0;
  });
  
}

addExpense(expense:any) {
    var expense_category = expense.category;
    this.notification = null;
    var datetime = new Date().getTime();
    var d = datetime.toString(); 
    var userdate = expense.date.year + '-' + expense.date.month + '-' + expense.date.day;
    var userdate_ms = new Date(userdate).getTime();
    var expenseAmount = parseInt(expense.amount) + parseInt(this.totalExpense); 
    var datetime_hr = new Date(datetime).toUTCString();
    var expense_byCategoryObject = this.tallySummary.expense_byCategory;
    if(expense_byCategoryObject[expense_category] && expense_byCategoryObject[expense_category].amount) {
        var last_category_amount = parseInt(expense_byCategoryObject[expense_category].amount);
        var new_category_amount = last_category_amount + parseInt(expense.amount);
    }
    else {
      var new_category_amount = parseInt(expense.amount);
      var last_category_amount = 0;
    }


    expense_byCategoryObject[expense_category] = {
        amount: new_category_amount,
        category: expense.category,
        datetime_ms: d,
        datetime_hr: datetime_hr,
        id: datetime,
        last_amount: parseInt(expense.amount),
        last_total: last_category_amount
    } 

    if(expense.amount > 0 && expense.category.length > 1) {
      this.firestore.collection('Tally').doc(d).set({
          expense: {
            id: datetime,
            amount: expense.amount,
            category: expense.category,
            subcategory: expense.subcategory,
            subcategory_others: expense.subcategory_others,
            transaction_type: "expense",
            datetime: datetime,
            userdate: userdate,
            userdate_ms: userdate_ms,
            note: expense.note,
          }

      });
      
      this.firestore.collection('TallySummary').doc('total_expense').set({
              expense_aggregate: {
                  amount: expenseAmount,
                  datetime_ms: d,
                  datetime_hr: datetime_hr,
                  last_amount: parseInt(expense.amount),
                  last_total: parseInt(this.totalExpense),
                  last_expense_type: expense_category
              },
             expense_byCategory: expense_byCategoryObject
      }).then(result => {
        this.getTotalExpense();
      });
      this.expense.amount = null;
      this.expense.note = null;
    }
    else {
        this.notification = 'Please put the financial information correctly.'
    }
  }
removeObject(object:any) {
  var id = object.expense.id.toString();
  var category = object.expense.category;
  var expenseAmount = parseInt(this.totalExpense) - parseInt(object.expense.amount);

  var datetime = new Date().getTime();
  var d = datetime.toString(); 
  var datetime_hr = new Date(datetime).toUTCString();


   // throw new Error("Hi");
   var r = confirm("Are you sure you want to delete this Item?");

   
   /* End Expense Category */


   if (r == true) {

     if(this.tallySummary.expense_byCategory[category] && this.tallySummary.expense_byCategory[category].amount) {
        var last_category_amount = parseInt(this.tallySummary.expense_byCategory[category].amount);
        var new_category_amount = last_category_amount - parseInt(object.expense.amount);




        var expense_byCategory = this.tallySummary.expense_byCategory; 


        //throw new Error("Hi");
         expense_byCategory[category] = {
              amount: new_category_amount,
              category: category,
              datetime_ms: d,
              datetime_hr: datetime_hr,
              id: datetime,
              last_amount: parseInt(object.expense.amount),
              last_total: last_category_amount,
              last_action_type: 'Delete'
          } 



         this.firestore.collection("Tally").doc(id).delete().then(result => {
              console.log("Document successfully deleted!");


              this.firestore.collection('TallySummary').doc('total_expense').set({
              expense_aggregate: {
                  amount: expenseAmount,
                  datetime_ms: d,
                  datetime_hr: datetime_hr,
                  last_amount: parseInt(object.expense.amount),
                  last_total: parseInt(this.totalExpense),
                  last_expense_type: category,
                  last_action_type: 'Delete'
              },
             expense_byCategory: expense_byCategory
              }).then(result => {
                this.getTotalExpense();
              });

          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });
    }

   /* Expense Category */
   
         
  } else {

  } 
}
/* End Remove */
getCategory(category:string) {
    this.expense.category = category;
}
getSubCategory(subcategory:string) {
  this.expense.subcategory = subcategory;
  if(subcategory=== 'Others'){
      this.sub_others = true;
  }
  else {
    this.sub_others = false;
  }
}
getByDay(date:any) {
  this.totalExpense = 0;
  var givendate = date.year + '-' + date.month + '-' + date.day;  
  this.firestore.collection('Tally', ref => ref.where('expense.userdate', '==', givendate)).valueChanges().subscribe(object=> {
        this.expenses = object; 
        this.expenses.forEach((element:any) => {
          this.totalExpense = parseInt(element.expense.amount) + this.totalExpense;
        });
    },
    error => {

    });
}
getPrevDate(date:any) {
  var day = new Date(date.year + '-' + date.month + '-' + date.day);
  var nextDay = new Date(day);
  var nd = nextDay.setDate(day.getDate() - 1); 
  var d1 = new Date(nd);
  this.selected_day = {
    year: d1.getFullYear(),
    month: d1.getMonth() + 1,
    day: d1.getDate()
  };
}
getNextDate(date:any) {
  var day = new Date(date.year + '-' + date.month + '-' + date.day);
  var nextDay = new Date(day);
  var nd = nextDay.setDate(day.getDate() + 1); 

  var d1 = new Date(nd);
 
  this.selected_day = {
    year: d1.getFullYear(),
    month: d1.getMonth() + 1,
    day: d1.getDate()
  };

}
getByRange(range:any) {

  var prevdate = range.prevdate.year + '-' + range.prevdate.month + '-' + range.prevdate.day;
  var prevdate_ms = new Date(prevdate).getTime();

  var nextdate = range.nextdate.year + '-' + range.nextdate.month + '-' + range.nextdate.day;
  var nextdate_ms = new Date(nextdate).getTime();

      if(prevdate_ms < nextdate_ms) {
          this.totalExpense = 0;
          this.firestore.collection('Tally', ref => ref.where('expense.userdate_ms', '>=', prevdate_ms).where('expense.userdate_ms', '<=', nextdate_ms)).valueChanges().subscribe(object=> {
            this.expenses = object;
            this.expenses.forEach((element:any) => {
            this.totalExpense = element.expense.amount + this.totalExpense;
            });
        });
      }
}

}
