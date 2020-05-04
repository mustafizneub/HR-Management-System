import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  public userForm: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public fb: FormBuilder,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private db: AngularFirestore


  ) { }

  ngOnInit(): void {
    this.uForm();

  }

  uForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      pass: ['', [Validators.required]],
      showclient: [''],
      showproject: ['']
    })
  }

  get email() {
    return this.userForm.get('email');
  }

  get pass() {
    return this.userForm.get('pass');
  }

  get showclient() {
    return this.userForm.get('showclient');
  }

  get showproject() {
    return this.userForm.get('showproject');
  }

  ResetForm() {
    this.userForm.reset();
  }

  submitUserData() {

    var info = this.userForm.value;
    var showProject = info['showproject'];
    var showClient = info['showclient'];

    if (showProject) {
      showProject = 1;
    } else {
      showProject = 0;
    }
    if (showClient) {
      showClient = "Client";
    } else {
      showClient = "Project";
    }




    return this.afAuth.createUserWithEmailAndPassword(info['email'], info['pass'])
      .then((result) => {
        this.db.collection('role').doc(info['email']).set({
          mail: info['email'],
          showproject: showProject,
          showclient: showClient,
        })

      }).catch((error) => {
        window.alert(error.message)
      })


  }

}
