import { Injectable, NgZone } from '@angular/core';
import { User } from "./user";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning

  ) {


    this.afAuth.authState.subscribe(user => {
      console.log(user)
      if (user) {
        this.userData = user;

        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
    if (!localStorage.getItem("logstatus")) {
      this.router.navigate(['']);

    }
  }

  getUserData() {
    return this.userData;
  }

  // Sign in with email/password
  SignIn(email, password) {
    var data;
    var info;
    var role;
    this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.afs.collection('role', ref => ref.where('mail', '==', email)).valueChanges().subscribe(object => {
        data = object;
        localStorage.setItem("role", data[0]['role']);
        console.log(data[0]['role']);
        //role = localStorage.getItem("role");
        //set permission
        this.afAuth.currentUser.then(x => {
          localStorage.setItem('id', x.uid);
        })
        localStorage.setItem("logstatus", "login");
        role = data[0]['role'];
        console.log(role, role === "employee");
        if (role) {
          if (role === "admin") {
            //doing static need to do fetch data from employee who has designation is admin

            localStorage.setItem("mail", "imtiaj.joy10@gmail.com");
            localStorage.setItem("fn", "Imtiaj");
            localStorage.setItem("ln", "Uddin");
            localStorage.setItem("empid", "YT-3210025556812");
            this.router.navigate(['/dashboard']);

          }
          else if (role === "employee") {

            this.afs.collection('registered-table', ref => ref.where('contact.email', '==', email)).valueChanges().subscribe(object => {
              info = object;
              localStorage.setItem("mail", email);
              localStorage.setItem("fn", info[0]['basic']['firstname']);
              localStorage.setItem("ln", info[0]['basic']['lastname']);
              localStorage.setItem("empid", info[0]['basic']['employee_id']);
              console.log(info);
              this.router.navigate(['/dashboard'])


            });

          }
          else if (role === "superadmin") {
            //doing static need to do fetch data from employee who has designation is superadmin

            localStorage.setItem("mail", "superadmin@gmail.com");
            localStorage.setItem("fn", "super");
            localStorage.setItem("ln", "admin");
            localStorage.setItem("empid", "YT-3210025556000");
            this.router.navigate(['/dashboard']);

          }
        }
      });



    }).catch((error) => {
      //window.alert(error)
      var msg = "error";
      if (error) {

        //console.log(msg);
        //this.router.navigate(['/sign-in', msg]);
        localStorage.setItem("errormail", email);
        localStorage.setItem("errorpsw", password);
        localStorage.setItem("error", error.message);
        this.router.navigate(['/sign-in', msg]);

      }


    })
  }


  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }




  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }
    return userRef.set(userData, {
      merge: true
    })
  }


  SignOut() {
    return this.afAuth.signOut().then(() => {
      window.localStorage.clear();
      window.location.href = 'http://localhost:4200/';
      //this.router.navigate(['']);
    })
  }

}