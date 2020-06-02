import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-template4-create',
  templateUrl: './template4-create.component.html',
  styleUrls: ['./template4-create.component.css']
})
export class Template4CreateComponent implements OnInit {

  url;
  array = [0];
  array1 = [0];
  array2 = [0];
  array3 = [0];
  array4 = [0];
  x = 1;


  constructor(private db: AngularFirestore,
    private afd: AngularFireDatabase,
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



  upload(event) {
    const file = event.target.files[0];
    const filePath = `profile/images/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.url = url;
        })
      })
    )
      .subscribe()
  }




  onSubmit(form: any) {

    let basicInfo = form.value.basicinfo;
    let qualification = form.value.qualification;
    let skills = form.value.skills;
    let projects = form.value.projects;
    let participation = form.value.Participation;
    let onlineJudge = form.value.onlineJudge;
    let experience = form.value.experience;
    let Downloadurl = '../../../../assets/images/user1.png';
    let id = localStorage.getItem('id');

    if (this.url) {
      let jobId = localStorage.getItem('jobId');
      this.db.collection('profile', ref => ref.where('userId', '==', id).where('jobId', '==', jobId)).snapshotChanges()
        .subscribe(x => {
          x.map(e => {
            this.db.collection('profile').doc(e.payload.doc.id).update({
              basicInfo,
              url: this.url,
              cvNo: 4,
              qualification,
              skills,
              projects,
              participation,
              onlineJudge,
              experience

            }).then(x => {
              this.afd.database.ref('profile').child(e.payload.doc.id).update({
                basicInfo,
                url: this.url,
                cvNo: 4,
                qualification,
                skills,
                projects,
                participation,
                onlineJudge,
                experience
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
              cvNo: 4,
              qualification,
              skills,
              projects,
              participation,
              onlineJudge,
              experience

            }).then(x => {
              this.afd.database.ref('profile').child(e.payload.doc.id).update({
                basicInfo,
                url: Downloadurl,
                cvNo: 4,
                qualification,
                skills,
                projects,
                participation,
                onlineJudge,
                experience
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
