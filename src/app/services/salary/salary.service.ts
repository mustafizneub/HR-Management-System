import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  data = []
  allSalary: any;
  dt: any;
  hst: any;

  constructor(private db: AngularFirestore, private http: HttpClient) {
    this.allSalary = this.db.collection('employee-salary', ref => ref.where('status', '==', 'active'));
  }

  createSlaray(salary) {

    this.db.collection('employee-salary').add(salary).then(() => {
      this.db.collection('employee-salary', ref => ref.where('staff_id', '==', salary.staff_id)).snapshotChanges()
        .subscribe(e => {
          let data = e.map(dt => {
            return {
              id: dt.payload.doc.id
            }
          })

          this.db.collection('employee-salary').doc(data[0].id).set({ fStoreId: data[0].id }, { merge: true })

        })
    });

    //SERVER
    //return this.http.post('http://localhost:3000/payroll/employee-salary', { salary: salary })

  }

  //SERVER
  addAllowance(id: string, allowance) {
    // return this.http.post(`http://localhost:3000/payroll/employee-salary/salary-history/${id}`, { allowance: allowance });
  }


  getEmployeesSalary() {
    return this.allSalary;
  }

  // SERVER
  // async getEmployeeSalary(id: string) {
  //   'use strict'
  //   return this.http.get(`http://localhost:3000/payroll/employee-salary/salary-history/${id}`)

  // }

  getEmployeeSalary(id: string) {
    return this.allSalary.doc(id);
  }

  updateSalary(employee: any, id: string) {
    this.allSalary.doc(id).set(employee, { merge: true });
  }

  deleteSalary(id: string) {
    this.allSalary.doc(id).set({ status: 'inactive' }, { merge: true });
  }




  deleteHistory(id, historyId) {
    let docRef = this.db.collection('employee-salary').doc(id)
    return docRef.update({
      [historyId]: firebase.firestore.FieldValue.delete()
    })

  }
}
