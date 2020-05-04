import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  date;

  constructor( private afs:AngularFirestore, 
    private afd:AngularFireDatabase) { }

  ngOnInit(): void {
    
  }

  onSubmit(form){
    let job = form.value.jobDetails;
    let today = new Date();
    let date = today.getFullYear() + '-' + ('0'+ (today.getMonth() + 1)).slice(-2) + '-' + ('0'+ today.getDate()).slice(-2);

    this.afs.collection('/jobs').add({
      job,
      postDate:date
    }).then(x => {
      this.afd.database.ref('/jobs').child(x.id).set({
        job,
        postDate:date
      })
      alert('Added Successfully.');
      window.location.reload();
      

    })
    

  }

}
