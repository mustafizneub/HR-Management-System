import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/database'


@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  data = [];
  allDep: any;

  constructor(private db: AngularFirestore) {
    this.allDep = this.db.collection('departments');
  }

  getDepartments() {
    // REALTIME DB
    firebase.database().ref('departments').once('value', snap => {
      let departments = snap.val()
      // console.log(snap.val())
    })
    // REALTIME DB ENDS
    return this.allDep;
  }


  getDepartment(id: string) {
    // REALTIME DB
    firebase.database().ref('departments').child(id).on('value', snap => {
      let department = snap.val()
      // console.log(department)
    })
    // REALTIME DB ENDS
    return this.allDep.doc(id);
  }

  addDepartment(department: { id: string; dep_name: string; }) {
    this.db.collection('departments').doc(department.id).set(department);

    // REALTIME DB
    firebase.database().ref('departments').child(department.id).set(department)
    // REALTIME DB ENDS
  }

  updateDepartment(department: string, id: string) {
    this.db.collection('departments').doc(id).set(department, { merge: true });

    // REALTIME DB
    firebase.database().ref('departments').child(id).update(department)
    // REALTIME DB ENDS
  }

  deleteDepartment(id: string) {
    this.db.collection('departments').doc(id).delete()

    // REALTIME DB
    firebase.database().ref('departments').child(id).remove();
    // REALTIME DB ENDS
  }

}
