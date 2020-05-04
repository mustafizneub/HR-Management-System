import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth/';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    private aFAuth: AngularFireAuth
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // if (this.authService.isLoggedIn !== true) {
    //   this.router.navigate(['sign-in'])
    // }

    //##################
    console.log(this.aFAuth.currentUser)
    if (!this.aFAuth.currentUser) {

      this.router.navigate(['sign-in'])
    }
    return true;
  }

}