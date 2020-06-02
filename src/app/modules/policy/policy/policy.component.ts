import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  policy;
  term;
  Array = [];
  constructor(
    private afs: AngularFirestore,
    private route:ActivatedRoute,
    private location:Location
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      this.afs.collection('/policy').doc(x.id).valueChanges().subscribe(x=>{
          this.policy = x;
          document.getElementById('description').innerHTML = this.policy.policy.description;
      })
    })
  }

 back(){
   this.location.back();
 }

}
