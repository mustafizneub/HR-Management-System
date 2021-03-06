import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent implements OnInit {

  public clientForm: FormGroup;


  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public fb: FormBuilder,
    private db: AngularFirestore,
    private flashMessage: FlashMessagesService,

  ) { }

  ngOnInit() {
    this.cForm();
  }

  cForm() {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      cpname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^((\\+88-?)|0)?[0-9]{11}$')]],
      address: ['', [Validators.required]],
      company: ['', [Validators.required]]

    })
  }

  get name() {
    return this.clientForm.get('name');
  }

  get cpname() {
    return this.clientForm.get('cpname');
  }

  get email() {
    return this.clientForm.get('email');
  }

  get mobileNumber() {
    return this.clientForm.get('mobileNumber');
  }

  get address() {
    return this.clientForm.get('address');
  }

  get company() {
    return this.clientForm.get('company');
  }
  ResetForm() {
    this.clientForm.reset();
  }

  submitClientData() {

    var info = this.clientForm.value;

    // check company name exist or not

    var doc = this.db.collection('clients').doc(info['company']);
    doc.get().toPromise().then((docData) => {
      if (docData.exists) {
        //exist
        this.flashMessage.show('Same Company Name was Already Taken', { cssClass: 'alert-danger', timeout: 2000 });

      } else {
        // document does not exist 
        this.db.collection('clients').doc(info['company']).set({
          name: info['name'],
          cpname: info['cpname'],
          email: info['email'],
          contact_number: info['mobileNumber'],
          company_name: info['company'],
          address: info['address'],
          status: 1,

        })
        this.ResetForm();
        Swal.fire({
          title: 'Success',
          text: 'Successfully Data Added Into Database',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false
        })
        this.router.navigate(['/clients']);
      }
    }).catch((fail) => {
      // if something was wrong then come to this place
    });


  }
}
