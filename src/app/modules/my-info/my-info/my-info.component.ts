import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  public myinfoForm: FormGroup;
  data;
  constructor(
    public fb: FormBuilder,
    public db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.myIFm();

    this.db.collection('registered-table', ref => ref.where('basic.employee_id', '==', 'YT-101')).valueChanges().subscribe(object => {
      this.data = object;
      // console.log(this.data);

      this.fn.setValue(this.data[0]['basic']['firstname']);
      this.ln.setValue(this.data[0]['basic']['lastname']);
      this.empid.setValue(this.data[0]['basic']['employee_id']);

    });
  }
  myIFm() {
    this.myinfoForm = this.fb.group({
      fn: ['', [Validators.required, Validators.minLength(3)]],
      mn: ['', [Validators.required, Validators.minLength(3)]],
      ln: ['', [Validators.required, Validators.minLength(3)]],
      empid: ['', [Validators.required, Validators.minLength(3)]],
      oid: ['', [Validators.required, Validators.minLength(3)]],
      dob: ['', [Validators.required, Validators.minLength(3)]],
      ms: ['', [Validators.required, Validators.minLength(3)]],
      nation: ['', [Validators.required, Validators.minLength(3)]],
      lnum: ['', [Validators.required, Validators.minLength(3)]],
      led: ['', [Validators.required]],

      food: ['', [Validators.required]],
      hobbies: ['', [Validators.required]],
      bgrp: ['', [Validators.required]],



    })
  }

  get fn() {
    return this.myinfoForm.get('fn');
  }
  get mn() {
    return this.myinfoForm.get('mn');
  }
  get ln() {
    return this.myinfoForm.get('ln');
  }
  get empid() {
    return this.myinfoForm.get('empid');
  }
  get oid() {
    return this.myinfoForm.get('oid');
  }
  get dob() {
    return this.myinfoForm.get('dob');
  }
  get ms() {
    return this.myinfoForm.get('ms');
  }
  get nation() {
    return this.myinfoForm.get('nation');
  }
  get lnum() {
    return this.myinfoForm.get('lnum');
  }
  get led() {
    return this.myinfoForm.get('led');
  }

  get food() {
    return this.myinfoForm.get('food');
  }

  get hobbies() {
    return this.myinfoForm.get('hobbies');
  }

  get bgrp() {
    return this.myinfoForm.get('bgrp');
  }

  submitMyInfoData() {

  }

}
