import { Component, OnInit } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { DbService } from '../dbservice.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService, DbService]
})
export class DashboardComponent implements OnInit {
  faqOpen = [];
  faqContent = [];
  newsContent = [];

  faqClicked(i) {
    this.faqOpen[i] = !this.faqOpen[i];
  }

  constructor(private auth: AuthService, private dbService: DbService) { }

  ngOnInit() {
    this.getNews();
    this.getQuickstart();
  }

  getNews() {
    this.dbService.getNews().then((news) => {
      this.newsContent = news;
    });
  }

  getQuickstart() {
    this.dbService.getQuickstart().then((quickstart) => {
      this.faqContent = quickstart;
    });
  }

}

