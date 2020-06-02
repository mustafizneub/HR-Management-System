import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {


  clientList: any;
  p: number = 1;
  collection: any[];
  searchclient: string;
  // show: any;
  messageSuccess: any;
  editmessageSuccess: any;
  closeResult = '';
  name: string;
  cpname: string;
  mail: string;
  contact: string;
  company: string;
  address: string;
  list: boolean = true;
  gallary: boolean = false;
  constructor(
    private router: ActivatedRoute,
    public ngZone: NgZone,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    public route: Router,
    private modalService: NgbModal

  ) { }

  ngOnInit() {

    this.db.collection('clients', ref => ref.where('status', '==', 1)).valueChanges().subscribe(object => {
      this.clientList = object;
      console.log(this.clientList);
    });
  }


  delClient(cmpname) {



    this.db.collection('clients').doc(cmpname).set({
      status: 0
    }, { merge: true })

  }

  editClient(id) {
    this.route.navigate(['/edit-clients', id]);
  }

  detailsClient(companyname) {

  }

  showMessageSuccess() {

    this.messageSuccess = true;

    setTimeout(() => {
      this.messageSuccess = false;
    }, 4000);

  }




  open(content, name) {

    var data;

    this.db.collection('clients', ref => ref.where('company_name', '==', name)).valueChanges().subscribe(object => {

      data = object;
      if (data.length == 1) {
        this.name = data[0]['name'];
        this.cpname = data[0]['cpname'];
        this.mail = data[0]['email'];
        this.contact = data[0]['contact_number'];
        this.company = data[0]['company_name'];
        this.address = data[0]['address'];
      }

    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    console.log(name);
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




}
