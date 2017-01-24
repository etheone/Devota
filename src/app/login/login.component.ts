import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

   constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {

  }

  ngDoCheck() {
        console.log("I AM HERE");
    console.log(this.auth.authenticated())
    if(this.auth.authenticated()) {
      console.log("USER IS AUTHENTICATED");
      this.router.navigate(['./dashboard']);
    }
  }

}


