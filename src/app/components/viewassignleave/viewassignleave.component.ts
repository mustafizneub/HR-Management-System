import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-viewassignleave',
  templateUrl: './viewassignleave.component.html',
  styleUrls: ['./viewassignleave.component.css']
})
export class ViewassignleaveComponent implements OnInit {

  id;
  data;
  name;
  empid;
  mail;
  join;
  desgn;
  sick;
  emergency;
  crasual;
  medical;
  constructor(public router: ActivatedRoute, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.router.params.subscribe(param => {
      this.id = param.id;

      //console.log(this.id);
    })
    this.db.collection('registered-table', ref => ref.where('basic.employee_id', '==', this.id)).valueChanges().subscribe(object => {

      this.data = object;
      this.name = this.data[0]['basic']['firstname'] + " " + this.data[0]['basic']['lastname'];
      this.empid = this.data[0]['basic']['employee_id'];
      this.mail = this.data[0]['contact']['email'];
      this.join = this.data[0]['basic']['joining_date'];
      this.desgn = this.data[0]['basic']['designation'];
      this.sick = this.data[0]['sickleave'];
      this.emergency = this.data[0]['emergencyleave'];
      this.crasual = this.data[0]['crasualleave'];
      this.medical = this.data[0]['medicalleave'];





    });


  }

}
