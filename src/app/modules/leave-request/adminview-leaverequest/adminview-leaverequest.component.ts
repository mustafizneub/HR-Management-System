import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { LeaveRequestsService } from 'src/app/services/leave-requests/leave-requests.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgZone } from '@angular/core';
import { Router } from "@angular/router";

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
  cncel: boolean = false;
  cnc: boolean = false;
  show;
  constructor(private leaveReqService: LeaveRequestsService, private employeeService: EmployeeService, public db: AngularFirestore, private modalService: NgbModal, private fb: FormBuilder, public ngZone: NgZone,
    public router: Router,
  ) {

  }

  ngOnInit(): void {


    this.app = false;
    this.pend = false;
    this.rej = false;
    this.alls = true;
    this.cnc = false;
    this.db.collection('leave-request', ref => ref.where('status', '==', 1).where('role', '==', 'employee')).valueChanges().subscribe(object => {
      this.data = object;
    });

  }
  accepted() {

    this.app = true;
    this.pend = false;
    this.rej = false;
    this.alls = false;
    this.cnc = false;
    this.db.collection('leave-request', ref => ref.where('leavestatus', '==', "approve").where('status', '==', 1).where('role', '==', 'employee')).valueChanges().subscribe(object => {
      this.data = object;

    });

  }

  pending() {


    this.app = false;
    this.pend = true;
    this.rej = false;
    this.alls = false;
    this.cnc = false;

    this.db.collection('leave-request', ref => ref.where('leavestatus', '==', "pending").where('status', '==', 1).where('role', '==', 'employee')).valueChanges().subscribe(object => {
      this.data = object;

    });

  }
  reject() {


    this.app = false;
    this.pend = false;
    this.rej = true;
    this.alls = false;
    this.cnc = false;

    this.db.collection('leave-request', ref => ref.where('leavestatus', '==', "reject").where('status', '==', 1).where('role', '==', 'employee')).valueChanges().subscribe(object => {
      this.data = object;

    });

  }
  all() {

    this.app = false;
    this.pend = false;
    this.rej = false;
    this.alls = true;
    this.cnc = false;

    this.db.collection('leave-request', ref => ref.where('status', '==', 1).where('role', '==', 'employee')).valueChanges().subscribe(object => {
      this.data = object;
    });
  }
  cn() {
    this.app = false;
    this.pend = false;
    this.rej = false;
    this.alls = false;
    this.cnc = true;

    this.db.collection('leave-request', ref => ref.where('cancel', "in", [true, false]).where('status', '==', 1).where('role', '==', 'employee')).valueChanges().subscribe(object => {
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
      this.show = data[0]['leavestatus'];

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
  cancel(id, content) {
    this.cncel = true;
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
      this.status.setValue('approve', {
        onlySelf: true
      });
      this.ccel.setValue(data[0]['cancel']);

      // console.log(data[0]['empname']);

    });

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
      ccel: [''],

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
  get ccel() {
    return this.adleaveForm.get('ccel');
  }
  delete(id) {

    this.db.collection('leave-request').doc(id).update({ status: 0 })
      .then(() => {
        console.log('done');
        console.log("Success");

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
    console.log(data['status']);
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

    var remcrasual;
    var remmedical;
    var crasul;
    var medical;
    var takenLWOP;
    var takenEmergency;
    var fsid;
    var takenMl;
    var takenCl;
    if (data['status'] === 'approve') {
      console.log("res is" + data['status']);
      this.db.collection('registered-table', ref => ref.where('basic.employee_id', '==', "YT-101")).valueChanges().subscribe(object => {


        //console.log(object);


        // localStorage.setItem("remcrasual", object['0']['remcrasualleave']);
        // localStorage.setItem("remmedical", object['0']['remmedicalleave']);
        // localStorage.setItem("crasul", object['0']['crasualleave']);
        // localStorage.setItem("medical", object['0']['medicalleave']);
        // localStorage.setItem("takenLWOP", object['0']['takenLWOP']);
        // localStorage.setItem("takenEmergency", object['0']['takenEmergency']);
        // localStorage.setItem("fsid", object['0']['fStoreId']);




        remcrasual = object['0']['remcrasualleave'];
        remmedical = object['0']['remmedicalleave'];
        crasul = object['0']['crasualleave'];
        medical = object['0']['medicalleave'];
        takenLWOP = object['0']['takenLWOP'];
        takenEmergency = object['0']['takenEmergency'];
        fsid = object['0']['fStoreId'];
        takenMl = object['0']['takenmleave'];
        takenCl = object['0']['takencleave'];
        if (data['type'] === "Medical") {

          var days = parseInt(data['days']);
          var rmleave = remmedical - days;
          var taken = takenMl + days;



          this.db.collection('registered-table').doc(fsid).set({
            remmedicalleave: rmleave,
            takenmleave: taken,
          }, { merge: true })
        }
        else if (data['type'] === "Crasual") {
          var days = parseInt(data['days']);
          var crleave = remcrasual - days;
          var taken = takenCl + days;

          this.db.collection('registered-table').doc(fsid).set({
            remcrasualleave: crleave,
            takencleave: taken,
          }, { merge: true })

        }

        else if (data['type'] === "LWOP") {
          var days = parseInt(data['days']);
          var takenlw = days + takenLWOP;

          this.db.collection('registered-table').doc(fsid).set({
            takenLWOP: takenlw,
          }, { merge: true })

        }
        else if (data['type'] === "Emergency") {
          var days = parseInt(data['days']);
          var takenEm = days + takenEmergency;
          this.db.collection('registered-table').doc(fsid).set({
            takenEmergency: takenEm,
          }, { merge: true })

        }
        throw "Stop The Code";

      });



      //remcrasual = localStorage.getItem("remcrasual");
      // remmedical = localStorage.getItem("remmedical");
      // crasul = localStorage.getItem("crasul");
      // medical = localStorage.getItem("medical");
      // takenLWOP = localStorage.getItem("takenLWOP");
      // takenEmergency = localStorage.getItem("takenEmergency");
      // fsid = localStorage.getItem("fsid");
      //console.log("remcrasual" + remcrasual);
      //console.log(remmedical);
      //console.log(crasul);
      //console.log(medical);
      //console.log(takenLWOP);
      //console.log(takenEmergency);










    }




    this.modalRef.close();






  }
  cancelAccept() {

    var data = this.adleaveForm.value;

    //console.log(data['id']);
    //start
    var remcrasual;
    var remmedical;
    var crasul;
    var medical;
    var takenLWOP;
    var takenEmergency;
    var fsid;
    var takenMl;
    var takenCl;

    this.db.collection('registered-table', ref => ref.where('basic.employee_id', '==', data['id'])).valueChanges().subscribe(object => {

      remcrasual = object['0']['remcrasualleave'];
      remmedical = object['0']['remmedicalleave'];
      crasul = object['0']['crasualleave'];
      medical = object['0']['medicalleave'];
      takenLWOP = object['0']['takenLWOP'];
      takenEmergency = object['0']['takenEmergency'];
      fsid = object['0']['fStoreId'];
      takenMl = object['0']['takenmleave'];
      takenCl = object['0']['takencleave'];
      //console.log(object);
      if (data['type'] === "Medical") {

        var days = parseInt(data['days']);
        var rmleave = remmedical + days;
        var taken = takenMl - days;



        this.db.collection('registered-table').doc(fsid).set({
          remmedicalleave: rmleave,
          takenmleave: taken,
        }, { merge: true })
      } else if (data['type'] === "Crasual") {
        var days = parseInt(data['days']);
        var crleave = remcrasual + days;
        var taken = takenCl - days;

        this.db.collection('registered-table').doc(fsid).set({
          remcrasualleave: crleave,
          takencleave: taken,
        }, { merge: true })

      } else if (data['type'] === "LWOP") {
        var days = parseInt(data['days']);
        var takenlw = takenLWOP - days;

        this.db.collection('registered-table').doc(fsid).set({
          takenLWOP: takenlw,
        }, { merge: true })

      }
      else if (data['type'] === "Emergency") {
        var days = parseInt(data['days']);
        var takenEm = takenEmergency - days;
        this.db.collection('registered-table').doc(fsid).set({
          takenEmergency: takenEm,
        }, { merge: true })

      }
      throw "Stop The Code";
    });

    this.db.collection('leave-request').doc(data['lid']).set({
      cancel: false,
    }, { merge: true });
    this.modalRef.close();




  }
}
