import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class CheckService {

  constructor(private db: AngularFirestore) { }

  getCheck(empId) {
    var data = this.db.collection('check', ref => ref.where('empid', '==', empId).where('status', '==', 1))
    return data;
  }

  checkIn(empId, date, time, note) {

    var exacttime = new Date().getTime() / 1000;
    this.db.collection("check").add({
      empid: empId,
      indate: date,
      checkin: time,
      innote: note,
      exacttime: exacttime,
      status: 1,
    }).then(docRef => {
      this.db.collection('check').doc(docRef.id).set({
        fsid: docRef.id
      }, { merge: true });
    })

  }

  fetchCheckIn(empId) {
    var data;
    data = this.db.collection('check', ref => ref.orderBy('exacttime', 'desc').where('empid', '==', empId))
    return data;
  }



  //attendance records
  searchBydate(date, empId) {
    var data;
    data = this.db.collection('check', ref => ref.where('indate', '==', date).where('status', '==', 1).where('empid', '==', empId));
    return data;
  }

  addBreak(id, type, breaktime, breaknote) {
    // console.log(id, type, breaktime, breaknote);

    this.db.collection('check', ref => ref.orderBy('exacttime', 'desc').where('empid', '==', id)).valueChanges().subscribe(object => {

      this.db.collection('check').doc(object[0]['fsid']).set({
        type: type,
        breaktime: breaktime,
        breaknote: breaknote,
      }, { merge: true });

      throw ("stop the code!");
    });
  }
  againCheckIn(id, cind, cint, cinn) {

    this.db.collection('check', ref => ref.orderBy('exacttime', 'desc').where('empid', '==', id)).valueChanges().subscribe(object => {

      this.db.collection('check').doc(object[0]['fsid']).set({
        againcheckindate: cind,
        againcheckintime: cint,
        againcheckinnote: cinn,

      }, { merge: true });

      throw ("stop the code!");
    });
  }

  checkOut(empId, date, time, note) {


    this.db.collection('check', ref => ref.orderBy('exacttime', 'desc').where('empid', '==', empId)).valueChanges().subscribe(object => {

      this.db.collection('check').doc(object[0]['fsid']).set({
        outdate: date,
        checkout: time,
        outnote: note,
      }, { merge: true });

      throw ("stop the code!");
    });
  }
}
