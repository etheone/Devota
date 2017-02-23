import { Component, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';
import { DbService } from '../dbservice.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.css'],
  providers: [AuthService, DbService]
})
export class GuidesComponent implements OnInit {
  
  faqOpen = [];
  faqContent = [];
  
  constructor(private auth: AuthService, private dbService: DbService) { }

  ngOnInit() {
    this.getQuickstart();
  }

  faqClicked(i) {
    this.faqOpen[i] = !this.faqOpen[i];
  }

  getQuickstart() {
    this.dbService.getQuickstart().then((quickstart) => {
      this.faqContent = quickstart;
    });
  }

}
