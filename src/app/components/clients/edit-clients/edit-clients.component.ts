import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.css']
})
export class EditClientsComponent implements OnInit {

  id: any;
  clientInfo: any;
  editForm: FormGroup;  // Define FormGroup
  constructor(
    public authService: AuthService,
    public ngZone: NgZone,
    private router: ActivatedRoute,
    public db: AngularFirestore,
    private fb: FormBuilder,
    private route: Router,


  ) {

  }

  ngOnInit() {

    //ready the form
    this.updateClientData()
    //find id from client.component
    this.router.params.subscribe(param => {
      this.id = param.id;

      // console.log(this.id);
    })
    //fetch & set data in reactive form
    this.db.collection('clients', ref => ref.where('company_name', '==', this.id)).valueChanges().subscribe(object => {

      this.clientInfo = object;
      if (this.clientInfo.length == 1) {
        this.name.setValue(this.clientInfo[0]['name']);
        this.cpname.setValue(this.clientInfo[0]['cpname']);
        this.email.setValue(this.clientInfo[0]['email']);
        this.mobileNumber.setValue(this.clientInfo[0]['contact_number']);
        this.company.setValue(this.clientInfo[0]['company_name']);
        this.address.setValue(this.clientInfo[0]['address']);
      }



    });



  }

  updateClientData() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      cpname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^((\\+88-?)|0)?[0-9]{11}$')]],
      company: ['', [Validators.required]],
      address: ['', [Validators.required]],

    })

  }

  updateForm() {

    Swal.fire({
      title: 'Success',
      text: 'Successfully Updated',
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false
    })

    var info = this.editForm.value;
    var nm = info['name'];
    var cpname = info['cpname'];
    var mail = info['email'];
    var mn = info['mobileNumber'];
    var ad = info['address'];
    var cn = info['company'];

    //update data in firesore

    //console.log(typeof (this.id));
    this.db.collection('clients').doc(this.id).delete();
    this.db.collection('clients').doc(cn).set({
      name: nm,
      cpname: cpname,
      email: mail,
      contact_number: mn,
      company_name: cn,
      address: ad,
      status: 1
    });
    this.route.navigate(['/clients']);


  }

  get name() {
    return this.editForm.get('name');
  }

  get cpname() {
    return this.editForm.get('cpname');
  }

  get email() {
    return this.editForm.get('email');
  }

  get mobileNumber() {
    return this.editForm.get('mobileNumber');
  }

  get company() {
    return this.editForm.get('company');
  }

  get address() {
    return this.editForm.get('address');
  }
  ResetForm() {
    this.editForm.reset();
  }

}
