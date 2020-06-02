import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { LeaveRequestService } from 'src/app/services/leave-request/leave-request.service';

@Component({
  selector: 'app-add-leave-requests',
  templateUrl: './add-leave-requests.component.html',
  styleUrls: ['./add-leave-requests.component.css']
})

export class AddLeaveRequestsComponent implements OnInit {


  public adleaveForm: FormGroup;
  fileToUpload: File = null;
  link = "No File";
  time: boolean = false;
  medicalLeave;
  crasualLeave
  takenmleave;
  takencleave;
  takenEmergency;
  takenLWOP;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private leave: LeaveRequestService

  ) { }

  ngOnInit(): void {

    this.leaveForm();
    var empId;

    //set static data start
    localStorage.setItem("mail", "elyse@host.com");
    localStorage.setItem("fn", "Elyse");
    localStorage.setItem("ln", "Alves");
    localStorage.setItem("empid", "YT-101");
    localStorage.setItem("role", "employee");
    //set static data end

    // remaining & taken leave
    empId = localStorage.getItem("empid");

    this.leave.getEmployee(empId).valueChanges().subscribe(object => {

      this.medicalLeave = object[0]['remmedicalleave'];
      this.takenmleave = object[0]['takenmleave'];
      this.crasualLeave = object[0]['remcrasualleave'];
      this.takencleave = object[0]['takencleave'];
      this.takenEmergency = object[0]['takenEmergency'];
      this.takenLWOP = object[0]['takenLWOP'];

    });

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
    var formValue = this.adleaveForm.value;
    this.leave.addLeaveRequest(formValue, this.link);
    // this.ResetForm();
    //show success msg
    this.router.navigate(['view-leave-requests']);

  }
}
