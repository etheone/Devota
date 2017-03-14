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
      this.router.navigate(['./dashboard']);
    }
  }


  ngDoCheck() {

  }

}


