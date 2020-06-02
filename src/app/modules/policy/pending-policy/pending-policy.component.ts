import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

declare var $: any;

@Component({
  selector: 'app-pending-policy',
  templateUrl: './pending-policy.component.html',
  styleUrls: ['./pending-policy.component.css']
})
export class PendingPolicyComponent implements OnInit {

  admin: boolean = true;
  deleteId;
  deleteUrl;
  policy;
  term;
  Array = [];
  constructor(
    private afs: AngularFirestore,
    private afd: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
    if (this.admin) {
      this.afs.collection('/policy').snapshotChanges().subscribe(x => {
        this.policy = x.map(e => {
          return ({
            id: e.payload.doc.id,
            data: e.payload.doc.data()
          })
        })
        this.Array = this.policy
      })
    }
    else {
      this.afs.collection('/policy', ref => ref.where('isPublished', '==', true))
        .snapshotChanges().subscribe(x => {
          this.policy = x.map(e => {
            return ({
              id: e.payload.doc.id,
              data: e.payload.doc.data()
            })
          })
          this.Array = this.policy
        })
    }

  }

  ngOnInit(): void {
  }

  add(id) {
    this.afs.collection('/policy').doc(id).update({
      isPublished: true
    }).then(x => {
      this.afd.database.ref('policy').child(id).update({
        isPublished: true
      })
    })
  }

  remove(id) {
    this.afs.collection('/policy').doc(id).update({
      isPublished: false
    }).then(x => {
      this.afd.database.ref('policy').child(id).update({
        isPublished: false
      })
    })
  }

  confirm(id, url) {
    this.deleteId = id;
    this.deleteUrl = url;
  }


  delete() {
    if (this.deleteUrl != null) {
      this.storage.storage.refFromURL(this.deleteUrl).delete();
    }

    this.afs.collection('/policy').doc(this.deleteId).delete()
      .then(x => {
        this.afd.database.ref('/policy').child(this.deleteId).remove().then(x => {
          alert('Deleted Succcesfully');
        })
      })
  }


  filterByName() {
    let filteredArray = [];
    for (let i = 0; i < this.Array.length; i++) {
      if (this.Array[i].data.policy.title.toLowerCase().includes(this.term.toLowerCase())) {
        filteredArray.push(this.Array[i])
      }
    }
    this.policy = filteredArray.length > 0 ? filteredArray : []

  }

  filterByLocation(x) {
    let filteredArray = []
    for (let i = 0; i < this.Array.length; i++) {
      if (this.Array[i].data.policy.location == x) {
        filteredArray.push(this.Array[i]);
      }
    }
    this.policy = filteredArray.length > 0 ? filteredArray : []
  }

}
