import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { materialize } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  msg;
  checked;
  error;
  constructor(
    public authService: AuthService,
    private router: ActivatedRoute,
    private aFAuth: AngularFireAuth,
    private cookie: CookieService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(param => {
      this.msg = param.msg;

    })
    //for show error
    if (localStorage.getItem('error')) {

      document.getElementById("errormail").setAttribute('value', localStorage.getItem("errormail"));
      document.getElementById("errorpsw").setAttribute('value', localStorage.getItem("errorpsw"));
      this.error = localStorage.getItem('error');
    }

    //for remember me

    if (this.cookie.get('checked') == "show") {
      this.checked = "show";
    } else if (this.cookie.get('checked') == "hide") {
      this.checked = "hide";
    } else if (!this.cookie.get('checked')) {
      this.checked = "hide";
    }


    if (this.cookie.get('rem-mail')) {
      document.getElementById("errormail").setAttribute('value', this.cookie.get('rem-mail'));
      document.getElementById("errorpsw").setAttribute('value', this.cookie.get('rem-psw'));
    }

    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('reload')
    }
  }
  isRemberMe(event, mail, psw) {
    var mark = event.target.checked;
    if (mark) {
      this.cookie.set('checked', "show");
      this.cookie.set('rem-mail', mail);
      this.cookie.set('rem-psw', psw);
    } else {
      this.cookie.deleteAll();

    }
  }
}