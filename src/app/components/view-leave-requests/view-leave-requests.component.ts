import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { LeaveRequestsService } from 'src/app/services/leave-requests/leave-requests.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";


@Component({
  selector: 'app-view-leave-requests',
  templateUrl: './view-leave-requests.component.html',
  styleUrls: ['./view-leave-requests.component.css']
})
export class ViewLeaveRequestsComponent implements OnInit {

  closeResult = '';
  data: any;
  p: number = 1;
  collection: any[];
  modalOpen: boolean = false;
  modalRef;

  app: boolean = false;
  pend: boolean = false;
  rej: boolean = false;
  alls: boolean = false;
  mtype;
  mfrom;
  mto;
  mdays;
  mwhen;
  mdes;
  mstat;
  mrejectstat;
  mfile;
  public adleaveForm: FormGroup;

  constructor(private leaveReqService: LeaveRequestsService, private employeeService: EmployeeService, private db: AngularFirestore, private modalService: NgbModal, private fb: FormBuilder, public router: Router) {

  }

  ngOnInit(): void {
    var mail = localStorage.getItem("mail");

    this.db.collection('leave-request', ref => ref.where('mail', '==', mail).where('status', '==', 1)).valueChanges().subscribe(object => {

      this.app = false;
      this.pend = false;
      this.rej = false;
      this.alls = true;
      this.data = object;
    });
  }
  accepted() {
    var mail = localStorage.getItem("mail");

    this.db.collection('leave-request', ref => ref.where('mail', '==', mail).where('leavestatus', '==', "approve").where('status', '==', 1)).valueChanges().subscribe(object => {
      this.app = true;
      this.pend = false;
      this.rej = false;
      this.alls = false;
      this.data = object;

    });

  }
  pending() {
    var mail = localStorage.getItem("mail");

    this.db.collection('leave-request', ref => ref.where('mail', '==', mail).where('leavestatus', '==', "pending").where('status', '==', 1)).valueChanges().subscribe(object => {
      this.app = false;
      this.pend = true;
      this.rej = false;
      this.alls = false;
      this.data = object;

    });

  }
  reject() {

    var mail = localStorage.getItem("mail");

    this.db.collection('leave-request', ref => ref.where('mail', '==', mail).where('leavestatus', '==', "reject").where('status', '==', 1)).valueChanges().subscribe(object => {
      this.app = false;
      this.pend = false;
      this.rej = true;
      this.alls = false;
      this.data = object;

    });

  }
  all() {
    this.app = false;
    this.pend = false;
    this.rej = false;
    this.alls = true;
    var mail = localStorage.getItem("mail");

    this.db.collection('leave-request', ref => ref.where('mail', '==', mail).where('status', '==', 1)).valueChanges().subscribe(object => {
      this.data = object;

    });
  }
  filteredData($event) {

  }
  action(id) {
    this.modalOpen = true;
  }
  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
  delete(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want To Delete ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.db.collection('leave-request').doc(id).update({ status: 0 })


        Swal.fire(
          'Deleted!',
          'Record Has Been Deleted',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Record Has Not Been Deleted',
          'error'
        )
      }
    })


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
  view(id, content) {


    this.leaveForm();

    var data;
    this.db.collection('leave-request', ref => ref.where('id', '==', id)).valueChanges().subscribe(object => {
      data = object;

      this.mtype = data[0]['type'];
      this.mfrom = data[0]['from'];
      this.mto = data[0]['to'];
      this.mdays = data[0]['days'];
      this.mwhen = data[0]['when'];
      this.mdes = data[0]['description'];
      this.mstat = data[0]['leavestatus'];
      if (data[0]['leavestatus'] == "reject") {
        this.mrejectstat = data[0]['rejectcause'];

      }


      this.mfile = data[0]['file'];
      //console.log(this.mfile);



      // console.log(data[0]['empname']);

    });



    

    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //console.log(this.closeResult);
      this.mrejectstat = false;
      this.mfile = false;

    });



  }
  leaveForm() {
    this.adleaveForm = this.fb.group({
      name: [{ disabled: true }],
      id: [{ disabled: true }],
      type: [{ disabled: true }],
      from: [{ disabled: true }],
      to: [{ disabled: true }],
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
  edit(id) {
    this.router.navigate(['/editemployeeview-leave-request', id]);

  }
  file(path) {
    window.open(path);

  }
  submitleaveForm() {
    this.mrejectstat = false;
    this.mfile = false;
    //console.log(this.mrejectstat);
    this.modalRef.close();

  }

}
