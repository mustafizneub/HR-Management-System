import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { debounceTime, distinctUntilChanged, filter, map, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-editemployeeview-leave-request',
  templateUrl: './editemployeeview-leave-request.component.html',
  styleUrls: ['./editemployeeview-leave-request.component.css']
})
export class EditemployeeviewLeaveRequestComponent implements OnInit {


  did;
  rejectOption: boolean = false;
  vfile;
  public adleaveForm: FormGroup;
  link = "No File";

  constructor(private db: AngularFirestore, private modalService: NgbModal, private fb: FormBuilder, public ngZone: NgZone,
    public router: ActivatedRoute,
    public route: Router,
    public storage: AngularFireStorage,
  ) {

  }

  ngOnInit(): void {
    this.router.params.subscribe(param => {
      this.did = param.id;

      console.log(this.did);
    })
    this.leaveForm();

    var data;
    this.db.collection('leave-request', ref => ref.where('id', '==', this.did)).valueChanges().subscribe(object => {
      data = object;
      this.name.setValue(data[0]['empname']);
      this.id.setValue(data[0]['empid']);
      //this.type.setValue(data[0]['type']);
      this.type.setValue(data[0]['type'], {
        onlySelf: true
      })
      this.from.setValue(data[0]['from']);
      this.to.setValue(data[0]['to']);
      this.days.setValue(data[0]['days']);
      this.description.setValue(data[0]['description']);
      this.lid.setValue(data[0]['id']);
      this.mail.setValue(data[0]['mail']);
      // this.when.setValue(data[0]['when']);
      this.when.setValue(data[0]['when'], {
        onlySelf: true
      });
      this.status.setValue(data[0]['leavestatus']);

      if (data[0]['leavestatus'] === "accepted" || data[0]['leavestatus'] === "pending") {
        this.rejectstatus.setValue(" ");

      }
      this.vfile = data[0]['file'];







      // console.log(data[0]['empname']);

    });
  }


  leaveForm() {
    this.adleaveForm = this.fb.group({
      name: [{ disabled: true }],
      id: [{ disabled: true }],
      type: [''],
      from: [''],
      to: [''],
      days: [''],
      description: [''],
      status: ['', [Validators.required]],
      lid: [''],
      mail: [''],
      when: [''],
      rejectstatus: [''],

    })
  }

  get name() {
    return this.adleaveForm.get('name');
  }
  get id() {
    return this.adleaveForm.get('id');
  }
  get type() {
    return this.adleaveForm.get('type');
  }

  get from() {
    return this.adleaveForm.get('from');
  }

  get to() {
    return this.adleaveForm.get('to');
  }

  get days() {
    return this.adleaveForm.get('days');
  }

  get description() {
    return this.adleaveForm.get('description');
  }
  get status() {
    return this.adleaveForm.get('status');
  }
  get when() {
    return this.adleaveForm.get('when');
  }
  get rejectstatus() {
    return this.adleaveForm.get('rejectstatus');
  }
  get lid() {
    return this.adleaveForm.get('lid');
  }
  get mail() {
    return this.adleaveForm.get('mail');
  }
  file(path) {
    window.open(path);

  }
  uploadFile(event) {

    const file = event.target.files[0];

    let fileName = file.name;
    const filePath = `files/upload/leaverequest/${fileName}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          // console.log(url)
          this.link = url;

        })
      }
      )
    )
      .subscribe()

  }
  submitleaveForm() {

    var data = this.adleaveForm.value;
    var lid = data['lid'];
    lid = lid.toString();
    console.log(data['status']);
    console.log(data['name']);
    console.log(lid);
    if (this.link === 'No File') {
      this.link = this.vfile;

    }
    this.db.collection('leave-request').doc(lid).set({
      description: data['description'],
      empid: data['id'],
      empname: data['name'],
      id: lid,
      leavestatus: data['status'],
      mail: data['mail'],
      status: 1,
      to: data['to'],
      from: data['from'],
      type: data['type'],
      rejectcause: data['rejectstatus'],
      when: data['when'],
      role: "employee",
      days: data['days'],
      file: this.link,
    });
    

    this.route.navigate(['/view-leave-requests']);






  }

}
