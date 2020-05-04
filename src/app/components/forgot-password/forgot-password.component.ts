import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPass: FormGroup;
  status: boolean = false;

  constructor(
    public fb: FormBuilder,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.fPass();
  }
  fPass() {
    this.forgotPass = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    })
  }
  get email() {
    return this.forgotPass.get('email');
  }
  submitfPass() {

    var value = this.forgotPass.value;
    var mail = value['email'];
    //console.log(mail);

    var actionCodeSettings = {
      url: 'http://localhost:4200/sign-in',
      handleCodeInApp: false
    };

    this.afAuth.sendPasswordResetEmail(mail, actionCodeSettings).then(function () {
      console.log("Done");

    }).catch(function (error) {

    })
    this.status = true;
    this.email.setValue(mail);
  }

}
