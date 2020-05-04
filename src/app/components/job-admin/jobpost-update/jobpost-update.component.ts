import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-jobpost-update',
  templateUrl: './jobpost-update.component.html',
  styleUrls: ['./jobpost-update.component.css']
})
export class JobpostUpdateComponent implements OnInit {

  information;
  x;
  constructor(private afs: AngularFirestore,
    private afd: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.x = param.id;
      this.afs.collection('/jobs').doc(param.id).valueChanges().subscribe(x => {
        this.information = x;
      })
    })
  }

  onSubmit(form) {
    let job = form.value.jobDetails;

    this.afs.collection('/jobs').doc(this.x).update({
      job
    }).then(x => {
      this.afd.database.ref('/jobs').child(this.x).update({
        job
      }).then(x => {
        alert('updated Successfully.');
        this.router.navigate(['/admin-jobview', this.x])

      })

    })
  }
}
