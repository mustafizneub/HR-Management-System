import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import * as _ from 'lodash';

interface SortedIcon {
  amount: {
    icon: string,
    order: boolean
  },
  userdate_ms: {
    icon: string,
    order: boolean
  },
  datetime: {
    icon: string,
    order: boolean
  }
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  sortedIcon: SortedIcon = {
    amount: {
      icon: 'keyboard_arrow_down',
      order: true,
    },
    userdate_ms: {
      icon: 'keyboard_arrow_down',
      order: true,
    },
    datetime: {
      icon: 'keyboard_arrow_down',
      order: true,
    }
   
  };
  
  routeParameter = {
    category: '',
    categoryname: '',
  }
  totalAmount:any = 0;
  objects:any;
  selected_day:any = {
    year: new Date().getFullYear(), 
    month: new Date().getMonth() + 1, 
    day: new Date().getDate()
  };
  placement = 'bottom';
  p: number = 1;

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

constructor( private route: ActivatedRoute,
    private firestore: AngularFirestore) { 
    this.routeParameter = {
      category: this.route.snapshot.paramMap.get('category'),
      categoryname: this.route.snapshot.paramMap.get('categoryname')
    }

  }

ngOnInit(): void {
    this.totalAmount = 0;
    var category = `${this.routeParameter.category}.category`;
    this.firestore.collection('Tally', ref => ref.where(category, '==', this.routeParameter.categoryname)).valueChanges().subscribe(object=> {
      this.objects = object;
      this.objects.forEach((element:any) => {
        this.totalAmount = element[this.routeParameter.category]['amount'] + this.totalAmount;
      });
   });
}

getDataSort(sorting_type:any) {
  var transactioType = this.routeParameter.category;
  var sortingType = sorting_type;
  this.sortedIcon[sortingType].order =! this.sortedIcon[sortingType].order;
  if(this.sortedIcon[sortingType].order) {
    var sortedDataDesc = _.sortBy(this.objects, [function(o) { return o[transactioType][sortingType]}]);
    this.objects = sortedDataDesc;
    this.sortedIcon[sorting_type].icon = 'keyboard_arrow_down';
  }
  else {
      var sortedDataAsc = _.sortBy(this.objects, [function(o) { return o[transactioType][sortingType];}]).reverse();
      this.objects = sortedDataAsc;
      this.sortedIcon[sorting_type].icon = 'keyboard_arrow_up';
  }
}
getByDay(date:any) {
    var category = `${this.routeParameter.category}.category`;
    var userdate  = `${this.routeParameter.category}.userdate`;
    this.totalAmount = 0;
    var givendate = date.year + '-' + date.month + '-' + date.day;  
    this.firestore.collection('Tally', ref => ref.where(category, '==', this.routeParameter.categoryname).where(userdate, '==',givendate)).valueChanges().subscribe(object=> {
          this.objects = object; 
          this.objects.forEach(element => {
            this.totalAmount = element[this.routeParameter.category]['amount'] + this.totalAmount;
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
    var category = `${this.routeParameter.category}.category`;
    var userdate_ms = `${this.routeParameter.category}.userdate_ms`;
    var prevdate = range.prevdate.year + '-' + range.prevdate.month + '-' + range.prevdate.day;
    var prevdate_ms = new Date(prevdate).getTime();
    var nextdate = range.nextdate.year + '-' + range.nextdate.month + '-' + range.nextdate.day;
    var nextdate_ms = new Date(nextdate).getTime();

      if(prevdate_ms < nextdate_ms) {
          this.totalAmount = 0;
          this.firestore.collection('Tally', ref => ref.where(category, '==', this.routeParameter.categoryname).where(userdate_ms, '>=', prevdate_ms).where(userdate_ms, '<=', nextdate_ms)).valueChanges().subscribe(object=> {
            this.objects = object;
            this.objects.forEach(element => {
            this.totalAmount = element[this.routeParameter.category]['amount'] + this.totalAmount;
            });
        });
      }
}
  
}
