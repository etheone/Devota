import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  scrolled = "";

  @HostListener('window:scroll', ['$event'])
  doSomething(event) {
    
  }

  constructor(private auth: AuthService, private router: Router) {
    window.onscroll = () => {
      if (window.pageYOffset > 10) {
        this.scrolled = "solid";
      } 
      else { 
        this.scrolled = "";
      }
    }
  }

  ngOnInit() {
    if (this.auth.authenticated()) {
      console.log("User is authenticated");
      this.router.navigate(['./dashboard']);
    }
  }


  ngDoCheck() {
    /*console.log("I AM HERE");
    console.log(this.auth.authenticated())*/
    /*if(this.auth.authenticated()) {
      console.log("USER IS AUTHENTICATED");
      this.router.navigate(['./dashboard']);
    }*/
  }

}


