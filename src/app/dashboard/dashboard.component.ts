import { Component, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService]
})
export class DashboardComponent implements OnInit {
  faqOpen = [];
  
  faqClicked(i) {
    this.faqOpen[i] = !this.faqOpen[i];
  }

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}

