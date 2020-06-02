import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-template1-create',
  templateUrl: './template1-create.component.html',
  styleUrls: ['./template1-create.component.css']
})
export class Template1CreateComponent implements OnInit {

  array = [0];
  array1 = [0];
  array2 = [0];
  array3 = [0];
  array4 = [0];
  array5 = [0];
  array6 = [0];
  x = 1;
  url;


  constructor(private db: AngularFirestore, private afdb: AngularFireDatabase,
    private storage: AngularFireStorage, private router: Router) {


  }
  ngOnInit(): void {

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

  add3() {

    if (this.array3.length < 5) {
      this.array3.push(this.x);
    }
    else {
      alert('limit accrosed');
    }

  }
  remove3(i) {
    this.array3.splice(i, 1);

  }

  add4() {

    if (this.array4.length < 5) {
      this.array4.push(this.x);
    }
    else {
      alert('limit accrosed');
    }

  }
  remove4(i) {
    this.array4.splice(i, 1);

  }

  add5() {

    if (this.array5.length < 5) {
      this.array5.push(this.x);
    }
    else {
      alert('limit accrosed');
    }

  }
  remove5(i) {
    this.array5.splice(i, 1);

  }

  add6() {

    if (this.array6.length < 5) {
      this.array6.push(this.x);
    }
    else {
      alert('limit accrosed');
    }

  }
  remove6(i) {
    this.array6.splice(i, 1);

  }


  upload(event) {
    const file = event.target.files[0];
    const filePath = `profile/images/${Date.now()}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(url => {
          this.url = url;
        })
      })
    ).subscribe()
  }




  onSubmit(form: any) {

    let basicInfo = form.value.basicinfo;
    let qualification = form.value.qualification;
    let skills = form.value.skills;
    let projects = form.value.projects;
    let participation = form.value.Participation;
    let onlineJudge = form.value.onlineJudge;
    let experience = form.value.experience;
    let software = form.value.software;
    let hobby = form.value.interest;
    let id = localStorage.getItem('id');
    let Downloadurl = '../../../../assets/images/user1.png';

    if (this.url) {
      let jobId = localStorage.getItem('jobId');
      this.db.collection('profile', ref => ref.where('userId', '==', id).where('jobId', '==', jobId)).snapshotChanges()
        .subscribe(x => {
          x.map(e => {
            this.db.collection('profile').doc(e.payload.doc.id).update({

              basicInfo,
              url: this.url,
              cvNo: 1,
              qualification,
              skills,
              projects,
              participation,
              onlineJudge,
              experience,
              software,
              hobby

            }).then(x => {
              this.afdb.database.ref('profile').child(e.payload.doc.id).update({
                basicInfo,
                url: this.url,
                cvNo: 1,
                qualification,
                skills,
                projects,
                participation,
                onlineJudge,
                experience,
                software,
                hobby
              })

            })
          })
        })

    }
    else {

      let jobId = localStorage.getItem('jobId');
      this.db.collection('profile', ref => ref.where('userId', '==', id).where('jobId', '==', jobId)).snapshotChanges()
        .subscribe(x => {
          x.map(e => {
            this.db.collection('profile').doc(e.payload.doc.id).update({

              basicInfo,
              url: Downloadurl,
              cvNo: 1,
              qualification,
              skills,
              projects,
              participation,
              onlineJudge,
              experience,
              software,
              hobby

            }).then(x => {
              this.afdb.database.ref('profile').child(e.payload.doc.id).update({
                basicInfo,
                url: Downloadurl,
                cvNo: 1,
                qualification,
                skills,
                projects,
                participation,
                onlineJudge,
                experience,
                software,
                hobby
              })

            })
          })
        })
    }


    localStorage.removeItem('jobId');
    alert('Your Profile saved successfully');
    this.router.navigate(['/user/career']);

  }

}
