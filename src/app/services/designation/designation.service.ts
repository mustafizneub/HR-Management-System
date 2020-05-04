import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  data = [];
  allDes: any;

  constructor(private db: AngularFirestore) {
    this.allDes = this.db.collection('designations')
    this.allDes.get().subscribe(e => {
      this.data = e.docs.map(e => {
        return e.data();
      })
    })
  }

  getdesignations() {
    return this.allDes;
  }
  getDesignation(id) {
    let des;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        des = this.data[i]
      }
    }
    return des;
  }

  addDesignation(designation) {
    this.allDes.doc(designation.id).set(designation);
    this.data.push(designation);
  }
  updateDesignation(designation, id) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        this.data[i] = designation;
      }
    }
    this.allDes.doc(id).set(designation, { merge: true })
  }

  deleteDesignation(id) {
    this.allDes.doc(id).delete()
  }
}
