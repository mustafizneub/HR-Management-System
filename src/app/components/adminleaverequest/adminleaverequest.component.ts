import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-adminleaverequest',
  templateUrl: './adminleaverequest.component.html',
  styleUrls: ['./adminleaverequest.component.css']
})

export class AdminleaverequestComponent implements OnInit {

  public adleaveForm: FormGroup;

  id;
  data: any;
  fileToUpload: File = null;
  link = "No File";
  time: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public fb: FormBuilder,
    private db: AngularFirestore,
    private flashMessage: FlashMessagesService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {

    this.leaveForm();


  }

  when() {
    this.time = true;
  }
  closetime() {
    this.time = false;
  }


  leaveForm() {

    this.adleaveForm = this.fb.group({
      type: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      description: ['', [Validators.required]],
      whenleave: [''],
      whentime: [''],
      days: [''],

    })
  }

  get employee() {
    return this.adleaveForm.get('employee');
  }
  get empid() {
    return this.adleaveForm.get('empid');
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

  get whenleave() {
    return this.adleaveForm.get('whenleave');
  }
  get whentime() {
    return this.adleaveForm.get('whentime');
  }
  get description() {
    return this.adleaveForm.get('description');
  }
  get days() {
    return this.adleaveForm.get('days');
  }

  ResetForm() {
    this.adleaveForm.reset();
  }
  close() {
    this.router.navigate(['/dashboard']);
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

    var count;
    this.db.collection('leave-request', ref => ref.orderBy('id', 'desc')).valueChanges().subscribe(object => {
      this.data = object;
      if (this.data.length == 0) {
        count = "0";
        localStorage.setItem("count", count);
      } else {
        count = this.data[0]['id'];
        localStorage.setItem("count", count);
      }
      //console.log(count);
    });
    //console.log(localStorage.getItem("count"));
    if (localStorage.getItem("count")) {

      var id = parseInt(localStorage.getItem("count"));

      id = id + 1;
      var strid = id.toString();
      var leave = this.adleaveForm.value;
      this.db.collection('leave-request').doc(strid).set({
        empname: localStorage.getItem("fn") + " " + localStorage.getItem("ln"),
        empid: localStorage.getItem("empid"),
        mail: localStorage.getItem("mail"),
        type: leave['type'],
        from: leave['from'],
        to: leave['to'],
        days: leave['days'],
        description: leave['description'],
        leavestatus: "pending",
        id: strid,
        status: 1,
        when: leave['whenleave'],
        file: this.link,
        role: "admin",


      })
      this.ResetForm();
      Swal.fire({
        title: 'Success',
        text: 'Successfully Leave Request Submitted',
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      })
      this.router.navigate(['admin-leaverequest']);
    }









  }

}

