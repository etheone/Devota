import { Component, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService]
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
