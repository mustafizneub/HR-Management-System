import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  searchuser: string;
  userList: any;
  p: number = 1;
  collection: any[];
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private db: AngularFirestore,
    public afAuth: AngularFireAuth, // Inject Firebase auth service


  ) { }

  ngOnInit() {

    this.db.collection('role').valueChanges().subscribe(object => {
      this.userList = object;
      // console.log(this.userList);
    });

  }

  delUser(mail) {
    console.log(mail);
    var currentUser = mail.afAuth.auth;
    var user = this.afAuth.currentUser;
    firebase.auth().currentUser.delete().then(function () {
      // User deleted.
    }).catch(function (error) {
      // An error happened.
    });
    // user.delete().then(function () {
    //   // User deleted.
    // }).catch(function (error) {
    //   // An error happened.
    // });

  }

}
