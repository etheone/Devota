/*import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import {  AuthService } from '../auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }  else {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}*/