import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from '../../../services/employee/employee.service';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import 'firebase/firestore';


@Component({
  selector: 'app-attendence-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class AttendenceDetailComponent implements OnInit {
   id:any;
   data:any;
   reservedData: any;
   leave = {
     "Sick": {
       data: null,
       total: null
     },
     "Emergency": {
        data: null,
        total: null
     },
     "LWOP": {
       data: null,
       total: null
     }
   }

  sortedIcon = {
    leave_type: {
      icon: 'chevron down icon',
      order: true,
    },
    duration: {
      icon: 'chevron down icon',
      order: true,
    },
    leave_from: {
      icon: 'chevron down icon',
      order: true,
    },
    leave_to: {
      icon: 'chevron down icon',
      order: true,
    }
   
  };

  dateFilter: boolean = true;
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
  
   constructor( 
      private route: ActivatedRoute,
      private firestore: AngularFirestore
      ) { 
      this.id = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
          // YT-1586923980424, YT-102, YT-1586923980424




          this.firestore.collection('leave-request', ref => ref.where('empid', '==', this.id)).valueChanges().subscribe(object => {
              this.data = object.map((object:any) => {
                return ({
                    employee_id: object.empid,
                    employee_name: object.empname,
                    leave_type: object.type,
                    leave_from_ms: new Date(object.from).getTime(),
                    leave_to_ms: new Date(object.to).getTime(),
                    leave_from: object.from,
                    leave_to: object.to,
                    duration: object.days
                })
              });
              this.reservedData = this.data;

              console.log(this.data, '101');
              this.leave["Sick"].data = _.filter(this.data, { leave_type : 'Sick' });
              this.leave["Sick"].total = _.sumBy(this.leave["Sick"].data, function(o) { return parseFloat(o.duration); });

              this.leave["Emergency"].data = _.filter(this.data, { leave_type : 'Emergency' });
              this.leave["Emergency"].total = _.sumBy(this.leave["Emergency"].data, function(o) { return parseFloat(o.duration); });

              this.leave["LWOP"].data = _.filter(this.data, { leave_type : 'LWOP' });
              this.leave["LWOP"].total = _.sumBy(this.leave["LWOP"].data, function(o) { return parseFloat(o.duration); });


             
        });   
  }

  getDataSort(sorting_type:any) {
    var sortingType = sorting_type;
    this.sortedIcon[sortingType].order =! this.sortedIcon[sortingType].order;
    if(this.sortedIcon[sortingType].order) {
      var sortedDataDesc = _.sortBy(this.data, [function(o) { return o[sortingType]}]);
      this.data = sortedDataDesc;
      this.sortedIcon[sorting_type].icon = 'chevron down icon';
    }
    else {
        var sortedDataAsc = _.sortBy(this.data, [function(o) { return o[sortingType];}]).reverse();
        this.data = sortedDataAsc;
        this.sortedIcon[sorting_type].icon = 'chevron up icon';
    }
 }
 /* End getDataSort */
 getByRange(range:any) {
  // this.ngOnInit();

  var startDate = range.prevdate.year + '-' + range.prevdate.month + '-' + range.prevdate.day;
  var startDate_ms = new Date(startDate).getTime();

  var endDate = range.nextdate.year + '-' + range.nextdate.month + '-' + range.nextdate.day;
  var endDate_ms = new Date(endDate).getTime();

  /*this.data = this.data.filter(o => {
           return o.leave_from_ms >= prevdate_ms && o.leave_from_ms <= nextdate_ms; 
      });*/

  console.log(this.reservedData, '142');
  let filterdArray=[]
    for(let i=0; i<this.reservedData.length; i++){
      if(this.reservedData[i]['leave_from_ms'] >= startDate_ms && this.reservedData[i]['leave_from_ms'] <= endDate_ms){
        filterdArray.push(this.reservedData[i])
      }
    }
    this.data = filterdArray;
    
 
  }  /* End getByRange */

}