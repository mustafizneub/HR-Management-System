import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { LeaveRequestService } from 'src/app/services/leave-request/leave-request.service'



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
    public router: Router,
    public fb: FormBuilder,
    private storage: AngularFireStorage,
    private leave: LeaveRequestService,
  ) { }

  ngOnInit(): void {

    this.leaveForm();
    //set static data start
    localStorage.setItem("mail", "imtiaj.joy10@gmail.com");
    localStorage.setItem("fn", "Imtiaj");
    localStorage.setItem("ln", "Uddin");
    localStorage.setItem("empid", "YT-3210025556812");
    localStorage.setItem("role", "admin");
    //set static data end


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

    this.leave.addAdminLeaveRequest(this.adleaveForm.value, this.link);
    this.ResetForm();
    console.log("Success");
    this.router.navigate(['admin-leaverequest']);

  }

}

