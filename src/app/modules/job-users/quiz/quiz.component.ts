import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions;
  array = [];

  constructor(private db: AngularFirestore,
    private afd: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.db.collection('/quiz')
      .snapshotChanges()
      .subscribe(questions => {
        this.questions = questions.map(e => {
          return ({
            id: e.payload.doc.id,
            data: e.payload.doc.data()
          })
        });
      })
  }

  ngOnInit(): void {

  }

  onSubmit(form) {
    let answer = form.value.answers;
    let userId = localStorage.getItem('id')
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;

    this.route.params.subscribe(x => {
      let id = x.id;
      localStorage.setItem('jobId', id);
      this.db.collection('/profile').add({
        jobId: id,
        isSelected: 0,
        answers: answer,
        dateTime: dateTime,
        userId: userId
      }).then(x => {
        this.db.collection('/profile', ref => ref.where('userId', '==', userId)
          .where('jobId', '==', id)).snapshotChanges().subscribe(x => {
            x.map(e => {
              this.afd.database.ref('/profile').child(e.payload.doc.id).set({
                jobId: id,
                isSelected: 0,
                answers: answer,
                dateTime: dateTime,
                userId: userId
              })
            })
          })
        this.router.navigate(['/templates/create-resume'])
      })
    })
  }
}
