import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SalaryService {
  data = [];
  allSalary: any;
  dt: any;
  hst: any;

  constructor(private db: AngularFirestore, private http: HttpClient) {
    this.allSalary = this.db.collection("employee-salary", (ref) =>
      ref.where("status", "==", "active")
    );
  }

  createSlaray(data, salary) {
    let payslip_no;
    if (data.length < 9) {
      payslip_no = '#00' + (data.length + 1).toString()
    } else if (data.length >= 9 && data.length < 99) {
      payslip_no = '#0' + (data.length + 1).toString()
    } else {
      payslip_no = '#' + (data.length + 1).toString();
    }
    salary.payslip_no = payslip_no;

    return this.db.collection("employee-salary").add(salary)

    // .then(() => {
    //   this.db
    //     .collection("employee-salary", (ref) =>
    //       ref.where("staff_id", "==", salary.staff_id)
    //     )
    //     .snapshotChanges()
    //     .subscribe((e) => {
    //       let data = e.map((dt) => {
    //         return {
    //           id: dt.payload.doc.id,
    //         };
    //       });

    //       this.db
    //         .collection("employee-salary")
    //         .doc(data[0].id)
    //         .set({ fStoreId: data[0].id }, { merge: true });
    //     });

    //   // Realtime DB SECTION
    //   firebase.database().ref("employee-salary").push(salary);
    //   firebase
    //     .database()
    //     .ref("employee-salary")
    //     .orderByChild("staff_id")
    //     .equalTo(salary.staff_id)
    //     .once("value", (snapshot) => {
    //       let keys = [];
    //       snapshot.forEach((salary) => {
    //         keys.push(salary.key);
    //       });

    //       firebase
    //         .database()
    //         .ref("employee-salary")
    //         .child(keys[0])
    //         .update({ dbId: keys[0] });
    //     });
    // });

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

  updateSalary(salary: any, id: string, empId: string) {

    // UPDATE IN REALTIME DB
    firebase
      .database()
      .ref("employee-salary")
      .orderByChild("staff_id")
      .equalTo(empId)
      .once("value", (snapshot) => {
        let keys = [];
        snapshot.forEach((snap) => {
          keys.push(snap.key);
        });

        firebase
          .database()
          .ref("employee-salary")
          .child(keys[0])
          .update(salary);
      });
    // REALTIME DB ENDS

    return this.getEmployeeSalary(id).set(salary, { merge: true });
  }

  addMonthlyAllowance(id, empId, month, allowance) {
    // REALTIME DB

    firebase
      .database()
      .ref("employee-salary")
      .orderByChild("staff_id")
      .equalTo(empId)
      .once("value", (snapshot) => {
        let keys = [];
        snapshot.forEach((salary) => {
          keys.push(salary.key);
        });

        firebase
          .database()
          .ref("employee-salary")
          .child(keys[0])
          .update({ [month]: allowance });
      });

    // REALTIME DB ENDS

    return this.getEmployeeSalary(id).set({ [month]: allowance }, { merge: true });
  }

  deleteSalary(id: string) {
    this.allSalary.doc(id).set({ status: "inactive" }, { merge: true });
  }

  deleteHistory(id, historyId) {
    let docRef = this.db.collection("employee-salary").doc(id);

    // REALTIME DB
    firebase
      .database()
      .ref("employee-salary")
      .child("-M6hZlRFJY0oByzZRBfn")
      .child(historyId)
      .set(null);
    // REALTIME DB ENDS

    return docRef.update({
      [historyId]: firebase.firestore.FieldValue.delete(),
    });
  }
}
