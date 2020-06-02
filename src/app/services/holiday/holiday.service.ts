import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/database';


@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  data = []
  allHoliday: any;
  constructor(private db: AngularFirestore) {
    this.allHoliday = this.db.collection('holidays')
    this.allHoliday.get().subscribe(e => {
      this.data = e.docs.map(e => {
        return e.data()
      })
    })
  }

  getHolidays() {
    firebase.database().ref('holidays').once('value', snaps => {
      let holidays = snaps.val();
    })
    return this.allHoliday
    // return this.data;
  }
  getHoliday(id: string) {
    // REALTIME DB
    firebase.database().ref('holidays').child(id).once('value', snap => {
      let holiday = snap.val()
    })
    // REALTIME DB ENDS
    return this.allHoliday.doc(id)
  }
  createHoliday(holiday) {
    this.allHoliday.doc(holiday.id).set(holiday);

    // REALTIME DB
    firebase.database().ref('holidays').child(holiday.id).set(holiday);
    // REALTIME DB ENDS
  }
  updateHoliday(holiday, id) {
    this.allHoliday.doc(id).set(holiday, { merge: true })

    // REALTIME DB
    firebase.database().ref('holidays').child(id).update(holiday)
    // REALTIME DB ENDS
  }
  deleteHoliday(id) {
    this.allHoliday.doc(id).delete()
    // REALTIME DB
    firebase.database().ref('holidays').child(id).remove();
    // REALTIME DB ENDS
  }
}
