import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

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
    return this.allHoliday
    // return this.data;
  }
  getHoliday(id: string) {
    return this.allHoliday.doc(id)
  }
  createHoliday(holiday) {
    this.allHoliday.doc(holiday.id).set(holiday);
    this.data.push(holiday)
  }
  updateHoliday(holiday, id) {
    this.allHoliday.doc(id).set(holiday, { merge: true })
  }
  deleteHoliday(id) {
    this.allHoliday.doc(id).delete()
  }
}
