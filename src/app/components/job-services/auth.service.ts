import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  data;
  id;

  constructor(private auth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    private afd: AngularFireDatabase) { }

  signUp(name, email, password, confirmPassword) {

    if (password === confirmPassword) {
      this.auth.createUserWithEmailAndPassword(email, password).then(x => {
        let user = this.auth.currentUser.then(x => {
          this.afs.collection('/account').doc(x.uid).set({
            name: name,
            email: email,
            role: 'user'
          })
        });

      }).then(x => {
        let user = this.auth.currentUser.then(x => {
          this.afd.database.ref('/account').child(x.uid).set({
            name: name,
            email: email,
            role: 'user'
          })

        });
      });
      this.router.navigate(['/log-in']);
    }
    else {
      alert('Password does not match.');
    }

  }

  signIn(email, password) {
    this.auth.signInWithEmailAndPassword(email, password).then(x => {
      this.auth.currentUser.then(x => {
        this.afs
          .collection('/account')
          .doc(x.uid)
          .valueChanges()
          .subscribe((e) => {
            let info = e;
            localStorage.setItem('users', JSON.stringify(info));
            localStorage.setItem('id', x.uid)
            localStorage.setItem('isLoggedIn', 'true');
            console.log(localStorage.getItem('users'))
          });
      });


    });
    if (JSON.stringify(localStorage.getItem('users')) != null) {
      this.router.navigate(['/dashboard']);
    }
    else {
      alert('Invalid email or password');
      this.router.navigate(['/log-in']);
    }

  }


  signOut() {
    this.auth.signOut().then(x => {
      localStorage.removeItem('users');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('id');
    })
  }

  removeUser() {
    this.auth.currentUser.then(x => {
      x.delete();
    });
  }

  public convetToPDF(content,name) {
    var data = content;
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(name +'.pdf'); // Generated PDF
      confirm('Your file Downloaded.')
    });
  }

}
