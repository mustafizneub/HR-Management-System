import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app'

import 'firebase/firestore';
import 'firebase/database';

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
    // REALTIME DB
    firebase.database().ref('designations').once('value', snap => {
      let designations = snap.val();
    })
    // REALTIME DB ENDS
    return this.allDes;
  }
  getDesignation(id) {
    let des;
    firebase.database().ref('designations').child(id).once('value', snap => {
      let designation = snap.val();
    })

    return this.allDes.doc(id).valueChanges();
    ;
  }

  addDesignation(designation) {
    this.allDes.doc(designation.id).set(designation);

    // REALTIME DATABASE
    firebase.database().ref('designations').child(designation.id).set(designation);
    // REALTIME DATABASE ENDS
  }

  updateDesignation(designation, id) {
    this.allDes.doc(id).set(designation, { merge: true })

    // REALTIME DB
    firebase.database().ref('designations').child(id).update(designation)
    // REALTIME DB ENDS
  }

  deleteDesignation(id) {
    this.allDes.doc(id).delete()

    // REALTIME DB
    firebase.database().ref('designations').child(id).remove()
    // REALTIME DB ENDS
  }
}
