import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  news = [];
  information;
  employees;
  leaveEmployeeList = [];
  newsLength: number;
  employeeLength: number;
  policyList;
  policyLength;
  Notice;
  admin: boolean = false;
  state = 'Bangladesh';
  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
    if (!this.admin) {
      this.afs.collection('policy', ref => ref.where('isPublished', '==', true)
        .where('policy.location', '==', this.state))
        .snapshotChanges().subscribe(x => {
          this.policyList = x.map(e => {
            return ({
              id: e.payload.doc.id,
              data: e.payload.doc.data()
            })
          })
          this.policyLength = this.policyList.length;
        })
    }
    else if (this.admin) {
      this.afs.collection('policy')
        .snapshotChanges().subscribe(x => {
          this.policyList = x.map(e => {
            return ({
              id: e.payload.doc.id,
              data: e.payload.doc.data()
            })
          })
          this.policyLength = this.policyList.length;
        })
    }
  }

  ngOnInit(): void {
    //for notice 
    this.afs.collection('notice', ref => ref.where('is_approved', '==', 'Yes')).snapshotChanges()
      .subscribe(x => {
        this.news = x.map(e => {
          return ({
            id: e.payload.doc.id,
            data: e.payload.doc.data()
          })
        })
        this.news = this.filter(this.news)
        this.newsLength = this.news.length;
      })

    //Notice End
    //Code for leave employees
    let today = new Date();
    let date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);


    this.afs.collection('registered-table', ref => ref.where('employee_status', '==', 'active'))
      .snapshotChanges().subscribe(x => {
        this.employees = x.map(e => {
          return e.payload.doc.data()
        })
        for (let i = 0; i < this.employees.length; i++) {
          let id = this.employees[i].basic.employee_id
          this.afs.collection('leave-request', ref => ref.where('empid', '==', id)
            .where('leavestatus', '==', 'approve'))
            .snapshotChanges().subscribe(x => {
              this.information = x.map(e => {
                return e.payload.doc.data()
              })
              if (this.information.length > 0) {
                for (let j = 0; j < this.information.length; j++) {
                  if (this.information[j].from <= date && this.information[j].to >= date) {
                    this.leaveEmployeeList.push(this.employees[i]);
                    break;
                  }
                }
              }
              this.employeeLength = this.leaveEmployeeList.length;
            })
        }
      })
  }

  filter(array) {
    let newArray = []
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + ('0' + today.getDate()).slice(-2);
    for (let i = 0; i < array.length; i++) {
      if (array[i].data.startDate_ISO) {
        if (array[i].data.startDate_ISO <= date && array[i].data.endDate_ISO >= date) {
          newArray.push(array[i])
        }
      }
    }
    return newArray;
  }

  description(index) {
    this.Notice = this.news[index];
  }

  viewPolicy(id) {
    this.router.navigate(['/policy/policy', id])
  }

}
