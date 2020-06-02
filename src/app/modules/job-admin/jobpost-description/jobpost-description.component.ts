import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
declare var $: any;

@Component({
  selector: 'app-jobpost-description',
  templateUrl: './jobpost-description.component.html',
  styleUrls: ['./jobpost-description.component.css']
})
export class JobpostDescriptionComponent implements OnInit {
  information;
  x;
  applicants;
  count;
  deletableArray;
  keys;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    private afd: AngularFireDatabase
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.x = param.id;
      this.afs
        .collection('/jobs')
        .doc(param.id)
        .valueChanges()
        .subscribe((e) => {
          this.information = e;
          if (document.querySelector('#description')) {
            document.getElementById('description').innerHTML = this.information.job.description
          }

        });
      this.afs.collection('/profile', ref => ref.where('jobId', '==', this.x)).snapshotChanges()
        .subscribe(x => {
          let info = x.map(e => {
            return e.payload.doc.data();
          })
          this.applicants = info.length;
        })
    });
  }

  update() {
    this.router.navigate(['/admin/admin-jobupdate', this.x]);
  }

  delete() {

    this.afs
      .collection('/jobs')
      .doc(this.x).delete().then(x => {
        this.afs.collection('/profile', ref => ref.where('jobId', '==', this.x)).snapshotChanges()
          .subscribe(x => {
            this.deletableArray = x.map(e => {
              return ({
                id: e.payload.doc.id
              })
            })

            for (let i = 0; i < this.deletableArray.length; i++) {
              this.afs.collection('/profile').doc(this.deletableArray[i].id).delete()
                .then(x => {
                  this.afd.database.ref('/profile').child(this.deletableArray[i].id).remove()
                });
            }
          })

      }).then(x => {
        this.router.navigate(['/admin/admin-view']);
      })

  }

}
