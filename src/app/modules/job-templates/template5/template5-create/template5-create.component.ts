import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-template5-create',
  templateUrl: './template5-create.component.html',
  styleUrls: ['./template5-create.component.css']
})
export class Template5CreateComponent implements OnInit {

  info
  array = [0];
  array1 = [0];
  array2 = [0];
  x = 1;

  constructor(private db: AngularFirestore,
    private afd: AngularFireDatabase,
    private router: Router) { }

  ngOnInit(): void {
    this.info = JSON.parse(localStorage.getItem('user'));
    console.log(this.info.email)
  }

  add() {

    if (this.array.length < 5) {
      this.array.push(this.x);
    }
    else {
      alert('limit accrosed');
    }

  }
  remove(i) {
    this.array.splice(i, 1);
    console.log(i, this.array.length)

  }
  add1() {

    if (this.array1.length < 5) {
      this.array1.push(this.x);
    }
    else {
      alert('limit accrosed');
    }

  }
  remove1(i) {
    this.array1.splice(i, 1);
    console.log(i, this.array1.length)

  }

  add2() {

    if (this.array2.length < 5) {
      this.array2.push(this.x);
    }
    else {
      alert('limit accrosed');
    }

  }
  remove2(i) {
    this.array2.splice(i, 1);

  }


  onSubmit(form) {

    let basicInfo = form.value.basicinfo;
    let qualification = form.value.qualification;
    let experience = form.value.experience;
    let social = form.value.social;
    let software = form.value.software;
    let id = localStorage.getItem('id');

    let jobId = localStorage.getItem('jobId');
    this.db.collection('profile', ref => ref.where('userId', '==', id).where('jobId', '==', jobId)).snapshotChanges()
      .subscribe(x => {
        x.map(e => {
          this.db.collection('profile').doc(e.payload.doc.id).update({
            basicInfo,
            qualification,
            experience,
            social,
            software,
            cvNo: 5

          }).then(x => {
            this.afd.database.ref('profile').child(e.payload.doc.id).update({
              basicInfo,
              qualification,
              experience,
              social,
              software,
              cvNo: 5
            })
          })
        })
      })
    localStorage.removeItem('jobId')
    alert('you are Successfully Applied.')
    this.router.navigate(['/user/career'])
  }


}
