import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { Location } from '@angular/common'
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;

  //#######################
  openEmployees: boolean = false;
  openJob: boolean = false;
  openPayroll: boolean = false;
  openCareer: boolean = false;
  menubar: boolean;
  leaveRequest: boolean = false;
  adminctrl: boolean = false;
  role;

  public isCollapsed = true;
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private location: Location,
    private route: Router,
    private aFAuth: AngularFireAuth
  ) {

    //################################
    this.route.events.subscribe(() => {
      if (this.location.path().includes('/templates') || this.location.path().includes('/sign-in')) {
        this.menubar = true;
      }
      else {
        this.menubar = false;
      }
    })
  }

  ngOnInit() {
    this.user = this.authService.isLoggedIn;
    this.role = localStorage.getItem("role")

  }

  // ###############
  dropdown(pos) {
    if (pos === 0) {
      this.openEmployees = !this.openEmployees;
    }
    else if (pos === 1) {
      this.openJob = !this.openJob
    }
    else if (pos === 2) {
      this.openPayroll = !this.openPayroll
    }
    else if (pos === 3) {
      this.leaveRequest = !this.leaveRequest
    }
    else if (pos === 4) {
      this.adminctrl = !this.adminctrl
    }
    else if (pos === 5) {
      this.openCareer = !this.openCareer
    }
  }

  toggleSidebar() {
    document.getElementById("app-sidebar").classList.toggle('sidebar-collapse')
    setTimeout(() => {
      document.getElementById("app-sidebar").classList.toggle('d-none')
    }, 500)

    let main = document.getElementById("app-main-content")
    if (main.classList.contains('thirteen')) {
      main.classList.remove('thirteen');
      main.classList.remove('wide');
      main.classList.remove('stretched');
      main.classList.remove('column');

      main.classList.add('sixteen', 'wide', 'stretched', 'column');
    } else {
      main.classList.remove('sixteen');
      main.classList.remove('thirteen');
      main.classList.remove('wide');
      main.classList.remove('stretched');
      main.classList.remove('column');
      main.classList.add('thirteen', 'wide', 'stretched', 'column')
    }

  }
}
