import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Component({
  selector: 'app-assign-leaverequest',
  templateUrl: './assign-leaverequest.component.html',
  styleUrls: ['./assign-leaverequest.component.css']
})
export class AssignLeaverequestComponent implements OnInit {
  data;
  p: number = 1;
  collection: any[];
  searchassignleave;
  constructor(private db: AngularFirestore, public router: Router) { }

  ngOnInit(): void {
    this.db.collection('registered-table', ref => ref.where('employee_status', '==', "active").where('role', '==', "employee")).valueChanges().subscribe(object => {
      this.data = object;
      //console.log(this.data);
    });
  }
  add(id) {
    this.router.navigate(['/addassignleave', id]);
  }
  view(id) {
    this.router.navigate(['/viewassignleave', id]);

  }
  edit(id) {
    this.router.navigate(['/editassignleave', id]);

  }

}
