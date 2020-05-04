import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-to-job',
  templateUrl: './apply-to-job.component.html',
  styleUrls: ['./apply-to-job.component.css']
})
export class ApplyToJobComponent implements OnInit {

  application = new FormGroup({
    personal: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      avatar: new FormControl(''),
      apply_date: new FormControl(Date.now())
    }),
    contact: new FormGroup({
      phone_number: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl('')
    }),
    about: new FormControl(''),
    education: new FormGroup({
      hsc: new FormGroup({
        school: new FormControl(''),
        group: new FormControl(''),
        entry_year: new FormControl(''),
        passing_year: new FormControl(''),
        grade: new FormControl('')
      }),
      ssc: new FormGroup({
        school: new FormControl(''),
        group: new FormControl(''),
        entry_year: new FormControl(''),
        passing_year: new FormControl(''),
        grade: new FormControl('')
      }),
      bachelor: new FormGroup({
        university: new FormControl(''),
        department: new FormControl(''),
        entry_year: new FormControl(''),
        passing_year: new FormControl(''),
        grade: new FormControl('')
      })
    }),
    skills: new FormControl(''),
    job_experience: new FormGroup({
      company: new FormControl(''),
      designation: new FormControl(''),
      starting_date: new FormControl(''),
      expiry_date: new FormControl('')
    })
  })
  id: any;
  file: any;

  constructor(private aRoute: ActivatedRoute, private db: AngularFirestore, private http: HttpClient) {
    this.aRoute.params.subscribe(param => {
      this.id = param.id;
    })
  }

  ngOnInit(): void { }

  uploadImage(event) {
    this.file = event.target.files[0];
  }
  apply() {
    let formData = new FormData();
    formData.append('file', this.file);
    formData.append('upload_preset', 'wjwrg6om');

    this.http.post('https://api.cloudinary.com/v1_1/mihrab-miah/upload/', formData).subscribe(res => {
      if (res['secure_url']) {
        this.application.value.personal.avatar = res['secure_url'];
        this.db.collection('all-job').doc(this.id).collection('applications').add(this.application.value);
      } else {
        console.log("Unsuccessfull");
      }
    })

  }
}
