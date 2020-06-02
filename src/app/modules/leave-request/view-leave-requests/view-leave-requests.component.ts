import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { LeaveRequestService } from "src/app/services/leave-request/leave-request.service"

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
  cnc: boolean = false;
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
  public filter: FormGroup;


  constructor(private modalService: NgbModal, private fb: FormBuilder, private router: Router, private leave: LeaveRequestService, ) {

  }

  ngOnInit(): void {
    this.filterForm();
    //set static data start
    localStorage.setItem("mail", "elyse@host.com");
    //set static data end


    var mail = localStorage.getItem("mail");
    this.leave.allLeave(mail).valueChanges().subscribe(object => {

      console.log(object, '52');

      this.app = false;
      this.pend = false;
      this.rej = false;
      this.alls = true;
      this.data = object;

    });
  }
  accepted() {
    var mail = localStorage.getItem("mail");

    this.leave.acceptedLeave(mail).valueChanges().subscribe(object => {

      this.app = true;
      this.pend = false;
      this.rej = false;
      this.alls = false;
      this.data = object;

    });

  }
  pending() {
    var mail = localStorage.getItem("mail");
    this.leave.pendingLeave(mail).valueChanges().subscribe(object => {

      this.app = false;
      this.pend = true;
      this.rej = false;
      this.alls = false;
      this.cnc = false;
      this.data = object;

    });

  }
  reject() {

    var mail = localStorage.getItem("mail");
    this.leave.rejectLeave(mail).valueChanges().subscribe(object => {
      this.app = false;
      this.pend = false;
      this.cnc = false;
      this.rej = true;
      this.alls = false;
      this.data = object;
    });

  }
  all() {
    var mail = localStorage.getItem("mail");

    this.leave.allLeave(mail).valueChanges().subscribe(object => {
      this.data = object;
      this.app = false;
      this.pend = false;
      this.rej = false;
      this.cnc = false;
      this.alls = true;
    });
  }
  cn() {
    var mail = localStorage.getItem("mail");
    this.leave.cancelLeave(mail).valueChanges().subscribe(object => {
      this.app = false;
      this.pend = false;
      this.rej = false;
      this.alls = false;
      this.cnc = true;
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
    this.leave.deleteLeave(id);
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
    this.leave.viewLeave(id).valueChanges().subscribe(object => {
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
  cancel(id) {

    var cnfrm = confirm("Are U Sure To Cancel Your Approve Leave!!");
    if (cnfrm === true) {
      this.leave.cancelApproveLeave(id)
    }
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
  filterForm() {
    this.filter = this.fb.group({

      filterfrom: ['', [Validators.required]],
      filterto: ['', [Validators.required]],

    })
  }

  get filterfrom() {
    return this.filter.get('filterfrom');
  }
  get filterto() {
    return this.filter.get('filterto');
  }
  submitleaveForm() {
    this.mrejectstat = false;
    this.mfile = false;
    //console.log(this.mrejectstat);
    this.modalRef.close();
  }


  submitFilterData() {

    this.leave.filterData(this.filter.value).valueChanges().subscribe(object => {

      this.app = false;
      this.pend = false;
      this.rej = false;
      this.alls = true;
      this.data = object;
    });

  }
}
