import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.css']
})
export class MyJobComponent implements OnInit {

  information = [];
  jobInfo = [];

  constructor(private afs: AngularFirestore) {

  }

  ngOnInit(): void {
    let id = localStorage.getItem('id');
    this.afs.collection('/profile', ref => ref.where('userId', '==', id)).snapshotChanges().subscribe(x => {
      this.information = x.map(e => {
        return ({
          data: e.payload.doc.data()
        })
      });
      for (let i = 0; i < this.information.length; i++) {
        this.afs.collection('/jobs').doc(this.information[i].data.jobId).snapshotChanges()
          .subscribe(x => {
            this.jobInfo.push(x.payload.data());
          })
      }
    })
  }
}
