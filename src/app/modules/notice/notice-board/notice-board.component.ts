import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import 'firebase/firestore';
import * as _ from 'lodash';


@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css']       
})
export class NoticeBoardComponent implements OnInit {
  notices:any;                                    
  constructor(
     private firestore: AngularFirestore) { 
  }

  ngOnInit(): void {

    var date = new Date().toISOString().split("T")[0] 
    var date_ms = new Date(date).getTime();

    this.firestore.collection('Notice', ref => ref.where("endDate", ">=", date_ms).where("is_approved", "==", "Yes")).valueChanges().subscribe(object=> {
      this.notices = object;

      this.notices = this.notices.filter(o => {
           return o.startDate < date_ms; 
      });
   });     
  }
}  
