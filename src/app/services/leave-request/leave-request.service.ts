import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common'



@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {




  constructor(
    private db: AngularFirestore,
    public datepipe: DatePipe,
  ) {

  }

  //employee leave add & view start


  public getEmployee(id) {

    var data = this.db.collection('registered-table', ref => ref.where('basic.employee_id', '==', id))
    return data;

  }

  public addLeaveRequest(formvalue, link) {

    var leave = formvalue;
    this.db.collection("leave-request").add({

      empname: localStorage.getItem("fn") + " " + localStorage.getItem("ln"),
      empid: localStorage.getItem("empid"),
      mail: localStorage.getItem("mail"),
      type: leave['type'],
      from: leave['from'],
      to: leave['to'],
      days: leave['days'],
      description: leave['description'],
      leavestatus: "pending",
      status: 1,
      when: leave['whenleave'],
      file: link,
      role: "employee",

    })
      .then(docRef => {
        this.db.collection('leave-request').doc(docRef.id).set({
          id: docRef.id
        }, { merge: true });
      })

  }

  // view-leave-requests
  public getAllLeave(mail) {


  }

  public allLeave(mail) {
    var data = this.db.collection('leave-request', ref => ref.where('mail', '==', mail).where('status', '==', 1))
    return data;
  }

  public acceptedLeave(mail) {
    var data;
    data = this.db.collection('leave-request', ref => ref.where('mail', '==', mail).where('leavestatus', '==', "approve").where('status', '==', 1))
    return data;
  }
  public pendingLeave(mail) {
    var data;
    data = this.db.collection('leave-request', ref => ref.where('mail', '==', mail).where('leavestatus', '==', "pending").where('status', '==', 1))
    return data;
  }
  public rejectLeave(mail) {
    var data;
    data = this.db.collection('leave-request', ref => ref.where('mail', '==', mail).where('leavestatus', '==', "reject").where('status', '==', 1))
    return data;
  }
  public cancelLeave(mail) {
    var data;
    data = this.db.collection('leave-request', ref => ref.where('mail', '==', mail).where('cancel', 'in', [false, true]).where('status', '==', 1))
    return data;
  }
  public deleteLeave(id) {

    this.db.collection('leave-request').doc(id).update({ status: 0 })

  }
  public viewLeave(id) {
    var data;
    data = this.db.collection('leave-request', ref => ref.where('id', '==', id))
    return data;
  }
  public cancelApproveLeave(id) {
    this.db.collection('leave-request').doc(id).set({
      cancel: true,
    }, { merge: true });
  }

  //employee leave add & view end

  public filterData(formValue) {

    var from = formValue['filterfrom'];
    from = this.datepipe.transform(from, 'yyyy-MM-dd');
    from = new Date('2020-01-01');

    var to = formValue['filterto'];
    to = this.datepipe.transform(to, 'yyyy-MM-dd');
    to = new Date('2020-08-30');


    console.log(from);
    console.log(to);

    var data;
    data = this.db.collection('leave-request', ref => ref.where('from', '>=', from))
    return data;

  }

  //start admin leave
  public addAdminLeaveRequest(formvalue, link) {

    var leave = formvalue;
    this.db.collection("leave-request").add({

      empname: localStorage.getItem("fn") + " " + localStorage.getItem("ln"),
      empid: localStorage.getItem("empid"),
      mail: localStorage.getItem("mail"),
      type: leave['type'],
      from: leave['from'],
      to: leave['to'],
      days: leave['days'],
      description: leave['description'],
      leavestatus: "pending",
      status: 1,
      when: leave['whenleave'],
      file: link,
      role: "admin",



    })
      .then(docRef => {
        this.db.collection('leave-request').doc(docRef.id).set({
          id: docRef.id
        }, { merge: true });
      })

  }

  public getAdminLeave(mail) {
    var data;
    data = this.db.collection('leave-request', ref => ref.where('mail', '==', mail).where('status', '==', 1).where('role', '==', 'admin'))
    return data;
  }


  //end admin leave


}
