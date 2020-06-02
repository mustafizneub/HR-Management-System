import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})
export class JobDescriptionComponent implements OnInit {

  information;
  x;
  applicants;
  count;
  keys;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore
  ) {



  }

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

  apply() {
    let userId = localStorage.getItem('id');

    if (userId != null) {
      this.afs.collection('/profile', ref => ref.where('jobId', '==', this.x)
        .where('userId', '==', userId)).snapshotChanges()
        .subscribe(x => {
          this.count = x.length;
        })
      if (this.count == 0) {
        this.router.navigate(['/user/quiz', this.x]);
      }
      else if (this.count == 1) {
        alert('You are already applied for this Job.')
      }
    }
    else {
      alert('You Need to login First');
    }
  }


}
