import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
declare var $: any;

@Component({
  selector: 'app-shortlist',
  templateUrl: './shortlist.component.html',
  styleUrls: ['./shortlist.component.css']
})
export class ShortlistComponent implements OnInit {

  information = [];
  id: string;
  deleteId: string;
  deleteUrl: string;
  isPaginate = false;
  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.information.length
  };

  constructor(
    private afd: AngularFireDatabase,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {


  }

  ngOnInit(): void {
    this.route.params.subscribe(x => {
      this.id = x.id;
      this.afs.collection('/profile', ref => ref.where('jobId', '==', this.id).where('isSelected', '==', 1))
        .snapshotChanges()
        .subscribe(x => {
          this.information = x.map(e => {
            return ({
              id: e.payload.doc.id,
              data: e.payload.doc.data()
            })
          })
          if (this.information.length > this.config.itemsPerPage) {
            this.isPaginate = true;
          }
        })
    })

  }

  onPageChange(event) {
    this.config.currentPage = event;
  }

  removeShortlist(id) {
    this.afs.collection('profile').doc(id).update({
      isSelected: 0
    }).then(x => {
      this.afd.database.ref('profile').child(id).update({
        isSelected: 0
      })
    })
  }

  confirm(id, url) {
    this.deleteId = id;
    this.deleteUrl = url;
  }

  deleteCv() {
    if (this.deleteUrl && this.deleteUrl != '../../../../assets/images/user1.png') {
      this.storage.storage.refFromURL(this.deleteUrl).delete();
    }
    this.afs.collection('profile').doc(this.deleteId).delete().then(x => {
      this.afd.database.ref('profile').child(this.deleteId).remove()
    });
  }

}
