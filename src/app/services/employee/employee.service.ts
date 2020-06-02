
import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'

import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference } from '@angular/fire/storage'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  post: any;
  uploadPercentage: String;
  fileRef: AngularFireStorageReference;
  data;
  allEmployeeDb;
  employees: number;

  async deleteImage() {
    // await this.aFireStorage.storage
    //   .refFromURL(url)
    //   .delete().then(() => {
    //    true;
    //   })
    // return false;
  }

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private aFAuth: AngularFireAuth
  ) {
    this.db.collection('registered-table').doc('total-employees').get().subscribe(e => {
      this.employees = e.data()['total-employee'] ? e.data()['total-employee'] : 0;
    })
    this.allEmployeeDb = this.db.collection('all-employee', ref => ref.where('basic.employee_status', '==', 'active'))
  }

  getTotalEmployees() {
    return this.employees
  }


  getEmployees() {
    // FETCH FROM RDB
    firebase.database()
      .ref('registered-table')
      .orderByChild('basic/employee_status')
      .equalTo('active')
      .on('value', (snapshot) => {
        snapshot.forEach(data => {
          // DATA FETCHED
          let employees = data.val()
          // console.log(data.val())
        });

      })
    // FETCH RDB DATA ENDS
    return this.db.collection('registered-table', ref => ref.where('basic.employee_status', '==', 'active'));

  }

  getEmployee(id: string, empId) {

    // FETCH SINGLE EMPLOYEE FROM RDB
    firebase.database().ref('registered-table')
      .orderByChild('basic/employee_id')
      .equalTo(empId)
      .on('value', (snapshot) => {
        snapshot.forEach(data => {
          let employee = data.val()
          // DATA FETCH FROM RDB
        })
      })
    // RDB ENDS
    return this.db.collection('registered-table').doc(id)
  }

  getEmployeeById(id: string) {

    // FETCH SINGLE EMPLOYEE FROM RDB
    // firebase.database().ref('registered-table')
    //   .orderByChild('basic/employee_id')
    //   .equalTo(id)
    //   .on('value', (snapshot) => {
    //     console.log(snapshot.val());
    //   })

    return this.db.collection('registered-table', ref => ref.where('basic.employee_id', '==', id));
  }

  uploadImage(employee: any) {
    let formData = new FormData();
    formData.append('file', employee.basic.avatar);
    formData.append('upload_preset', 'wjwrg6om');
    return this.http.post('https://api.cloudinary.com/v1_1/mihrab-miah/upload/', formData)
  }

  createUserWithEmailAndPass(employee: any) {
    return this.aFAuth.createUserWithEmailAndPassword(employee.contact.email.trim(), employee.basic.password.trim())
  }


  create(employee: any) {
    // REALTIME-DB //
    firebase.database().ref('registered-table').push(employee)
    firebase.database().ref('registered-table').update({ total_employee: this.employees + 1 })
    firebase.database().ref('registered-table').orderByChild('basic/employee_id').equalTo(employee.basic.employee_id)
      .on('value', (snapshot) => {
        let id = []
        snapshot.forEach(e => {
          id.push(e.key)
        })
        employee.dbId = id[0]
        firebase.database().ref('registered-table').child(id[0]).update(employee)
      })
    // REALTIME-DB ENDS //

    // FIRESTORE
    return this.db.collection('registered-table').add(employee);
  }



  updateEmployee(employee: any, id: string) {

    // UPDATE IN RDB 2
    firebase.database().ref('registered-table')
      .orderByChild('basic/employee_id')
      .equalTo(employee.basic.employee_id)
      .on('value', (snapshot) => {
        let id = []
        snapshot.forEach(e => {
          id.push(e.key)
        })
        firebase.database().ref('registered-table').child(id[0]).update(employee);
      });
    return this.db.collection('registered-table').doc(id).set(employee, { merge: true });

  }



  deleteEmployee(ids: any) {

    // RDB DELETE EMPLOYEE
    firebase.database().ref('registered-table').orderByChild('basic/employee_id').equalTo(ids.empId)
      .on('value', (snapshot) => {
        let ids = []

        snapshot.forEach(e => {
          ids.push(e.key)
        });

        if (ids[0]) {
          firebase.database().ref(`registered-table/${ids[0]}`).child('basic').update({ employee_status: 'inactive' })
        }
      })

    return this.db.collection('registered-table').doc(ids.fsId).set({ basic: { employee_status: 'inactive' } }, { merge: true });

  }

}
