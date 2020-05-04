import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { LeaveRequestsService } from 'src/app/services/leave-requests/leave-requests.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgZone } from '@angular/core';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-adminview-leaverequest',
  templateUrl: './adminview-leaverequest.component.html',
  styleUrls: ['./adminview-leaverequest.component.css']
})
export class AdminviewLeaverequestComponent implements OnInit {

  closeResult = '';
  data: any;
  p: number = 1;
  collection: any[];
  modalOpen: boolean = false;
  public adleaveForm: FormGroup;
  modalRef;
  rejectOption: boolean = false;

  app: boolean = false;
  pend: boolean = false;
  rej: boolean = false;
  alls: boolean = false;
  constructor(private leaveReqService: LeaveRequestsService, private employeeService: EmployeeService, private db: AngularFirestore, private modalService: NgbModal, private fb: FormBuilder, public ngZone: NgZone,
    public router: Router,


  ) {

  }

  ngOnInit(): void {


    this.app = false;
    this.pend = false;
    this.rej = false;
    this.alls = true;

    this.db.collection('leave-request', ref => ref.where('status', '==', 1).where('role', '==', 'employee')).valueChanges().subscribe(object => {
      this.data = object;
    });

  }
  accepted() {

    this.app = true;
    this.pend = false;
    this.rej = false;
    this.alls = false;

    this.db.collection('leave-request', ref => ref.where('leavestatus', '==', "approve").where('status', '==', 1).where('role', '==', 'employee')).valueChanges().subscribe(object => {
      this.data = object;

    });

  }

  pending() {


    this.app = false;
    this.pend = true;
    this.rej = false;
    this.alls = false;

    this.db.collection('leave-request', ref => ref.where('leavestatus', '==', "pending").where('status', '==', 1).where('role', '==', 'employee')).valueChanges().subscribe(object => {
      this.data = object;

    });

  }
  reject() {


    this.app = false;
    this.pend = false;
    this.rej = true;
    this.alls = false;

    this.db.collection('leave-request', ref => ref.where('leavestatus', '==', "reject").where('status', '==', 1).where('role', '==', 'employee')).valueChanges().subscribe(object => {
      this.data = object;

    });

  }
  all() {

    this.app = false;
    this.pend = false;
    this.rej = false;
    this.alls = true;

    this.db.collection('leave-request', ref => ref.where('status', '==', 1).where('role', '==', 'employee')).valueChanges().subscribe(object => {
      this.data = object;
    });
  }
  filteredData($event) {

  }

  view(id, content) {


    this.leaveForm();

    var data;
    this.db.collection('leave-request', ref => ref.where('id', '==', id)).valueChanges().subscribe(object => {
      data = object;
      this.name.setValue(data[0]['empname']);
      this.id.setValue(data[0]['empid']);
      this.type.setValue(data[0]['type']);
      this.from.setValue(data[0]['from']);
      this.to.setValue(data[0]['to']);
      this.days.setValue(data[0]['days']);

      this.description.setValue(data[0]['description']);
      this.lid.setValue(data[0]['id']);
      this.mail.setValue(data[0]['mail']);
      this.when.setValue(data[0]['when']);
      this.status.setValue(data[0]['leavestatus'], {
        onlySelf: true
      });
      if (data[0]['leavestatus'] === "reject") {
        this.rejectOption = true;
        this.rejectstatus.setValue(data[0]['rejectcause']);


      }

      // console.log(data[0]['empname']);

    });



    //this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    //  this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }
  valueChange(event) {
    //console.log("selected value", event.target.value);
    //this.selected = event.target.value;
    var selected = event.target.value;
    if (selected === "reject") {
      this.rejectOption = true;
    } else if (selected === "approve" || selected === "pending") {
      this.rejectOption = false;
    }
  }
  edit(id) {
    // editadminview-leavereques
    this.router.navigate(['/editadminview-leavereques', id]);

  }
  leaveForm() {
    this.adleaveForm = this.fb.group({
      name: [{ disabled: true }],
      id: [{ disabled: true }],
      type: [{ disabled: true }],
      from: [{ disabled: true }],
      to: [{ disabled: true }],
      days: [''],
      description: [{ disabled: true }],
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
  delete(id) {

    this.db.collection('leave-request').doc(id).update({ status: 0 })
      .then(() => {
        console.log('done');
        Swal.fire({
          title: 'Success',
          text: 'Successfully Deleted',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false
        })
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });

  }
  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  submitleaveForm() {

    var data = this.adleaveForm.value;
    var lid = data['lid'];
    lid = lid.toString();
    console.log(data['status']);
    console.log(data['name']);
    console.log(lid);
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


    });

    this.modalRef.close();






  }
}
