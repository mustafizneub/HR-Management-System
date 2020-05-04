import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applied-jobs-home',
  templateUrl: './applied-jobs-home.component.html',
  styleUrls: ['./applied-jobs-home.component.css']
})
export class AppliedJobsHomeComponent implements OnInit {

  data = []
  t_headers = [
    { key: 'applicant_name', label: 'Applicant Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'apply_date', label: 'Apply Date' },
    { key: 'resume', label: 'Resume' },
    { key: 'actions', label: 'Actions' }

  ]
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('all-job').snapshotChanges().subscribe(e => {
      let ids = e.map(e => {
        return e.payload.doc.id;
      })
      if (ids) {
        for (let i = 0; i < ids.length; i++) {
          this.db.collection('all-job').doc(ids[i]).collection('applications').get().subscribe(e => {
            e.forEach(e => {
              this.data.push({
                applicant_id: ids[i],
                applicant_name: e.data().personal.firstname + e.data().personal.lastname,
                apply_date: e.data().personal.apply_date,
                email: e.data().contact.email,
                phone_number: e.data().contact.phone_number
              })
              console.log(this.data)
            })
          })
        }
      }
    })

    // this.db.collection('applied-job').valueChanges().subscribe(e => {
    //   this.data = e;
    // })
  }

  delete(id: string) {
    this.db.collection('applied-job').doc(id).delete();
  }
}
