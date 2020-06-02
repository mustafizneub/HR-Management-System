import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editassignleave',
  templateUrl: './editassignleave.component.html',
  styleUrls: ['./editassignleave.component.css']
})
export class EditassignleaveComponent implements OnInit {

  did;
  docId;

  public adleaveForm: FormGroup;

  constructor(private db: AngularFirestore, private fb: FormBuilder, public ngZone: NgZone,
    public router: ActivatedRoute,
    public route: Router,

  ) {

  }

  ngOnInit(): void {
    this.router.params.subscribe(param => {
      this.did = param.id;

      //console.log(this.id);
    })
    this.leaveForm();

    var data;
    this.db.collection('registered-table', ref => ref.where('basic.employee_id', '==', this.did)).valueChanges().subscribe(object => {
      data = object;
      this.docId = data[0]['fStoreId'];

      this.name.setValue(data[0]['basic']['firstname']);
      this.id.setValue(data[0]['basic']['employee_id']);
      this.mail.setValue(data[0]['contact']['email']);
      this.joining.setValue(data[0]['basic']['joining_date']);

      this.desgn.setValue(data[0]['basic']['designation']);
      this.sick.setValue(data[0]['sickleave']);
      this.emergency.setValue(data[0]['emergencyleave']);
      this.crasual.setValue(data[0]['crasualleave']);
      this.medical.setValue(data[0]['medicalleave']);

    });
  }
  leaveForm() {
    this.adleaveForm = this.fb.group({
      name: [{ disabled: true }],
      id: [{ disabled: true }],
      mail: [{ disabled: true }],
      joining: [{ disabled: true }],
      desgn: [{ disabled: true }],
      sick: ['', [Validators.required]],
      emergency: ['', [Validators.required]],
      crasual: ['', [Validators.required]],
      medical: ['', [Validators.required]],

    })
  }

  get name() {
    return this.adleaveForm.get('name');
  }
  get id() {
    return this.adleaveForm.get('id');
  }
  get joining() {
    return this.adleaveForm.get('joining');
  }

  get desgn() {
    return this.adleaveForm.get('desgn');
  }

  get mail() {
    return this.adleaveForm.get('mail');
  }

  get sick() {
    return this.adleaveForm.get('sick');
  }
  get emergency() {
    return this.adleaveForm.get('emergency');
  }
  get crasual() {
    return this.adleaveForm.get('crasual');
  }
  get medical() {
    return this.adleaveForm.get('medical');
  }
  submitleaveForm() {

    var data = this.adleaveForm.value;

    //console.log(typeof(id));
    this.db.collection('registered-table').doc(this.docId).set({

      sickleave: data['sick'],
      emergencyleave: data['emergency'],
      crasualleave: data['crasual'],
      medicalleave: data['medical'],


    }, { merge: true });


    this.route.navigate(['/assign-leaverequest']);






  }

}

