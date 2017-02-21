import { Component, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
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

  /*
  faqContent = [
    { title: "Adding a new device", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel elementum diam. Aliquam erat volutpat. Vivamus porttitor arcu sed sodales convallis. Duis lacinia dui massa, nec faucibus dui vehicula sed. Donec efficitur interdum ligula eu fringilla. In tempor id mi in euismod. Vestibulum sed mollis diam." },
    { title: "Edit an exisiting device", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel elementum diam. Aliquam erat volutpat. Vivamus porttitor arcu sed sodales convallis. Duis lacinia dui massa, nec faucibus dui vehicula sed. Donec efficitur interdum ligula eu fringilla. In tempor id mi in euismod. Vestibulum sed mollis diam." },
    { title: "Removing a device", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel elementum diam. Aliquam erat volutpat. Vivamus porttitor arcu sed sodales convallis. Duis lacinia dui massa, nec faucibus dui vehicula sed. Donec efficitur interdum ligula eu fringilla. In tempor id mi in euismod. Vestibulum sed mollis diam." },
    { title: "Review data", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel elementum diam. Aliquam erat volutpat. Vivamus porttitor arcu sed sodales convallis. Duis lacinia dui massa, nec faucibus dui vehicula sed. Donec efficitur interdum ligula eu fringilla. In tempor id mi in euismod. Vestibulum sed mollis diam." }
  ];
  
  /*newsContent = [
    { date: "2017-02-01", title: "We're recruting", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel elementum diam. Aliquam erat volutpat. Vivamus porttitor arcu sed sodales convallis. Duis lacinia dui massa, nec faucibus dui vehicula sed. Donec efficitur interdum ligula eu fringilla. In tempor id mi in euismod. Vestibulum sed mollis diam.", href: "#" },
    { date: "2017-01-27", title: "Booh-ya!", description: "Mauris iaculis maximus leo, vitae lobortis eros ullamcorper ac. Duis cursus urna nec dignissim feugiat. Phasellus quis varius tortor. Nunc cursus non nulla a faucibus. Nam hendrerit ultrices turpis at laoreet. Vestibulum sed massa sed libero porta luctus quis id neque. Aliquam sapien lorem, placerat ut odio vitae, hendrerit facilisis tellus.", href: "#" },
    { date: "2017-01-14", title: "2017 - Entering a new era", description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras lacus elit, interdum et mollis a, varius eu ante. Maecenas posuere maximus tempus. Vestibulum ac congue neque, in lobortis mi. Phasellus quis tincidunt dolor, non molestie erat. Curabitur ac nibh nec magna consequat mattis vel in magna. Donec sit amet porttitor nunc, vel euismod sapien.", href: "#" }
  ];*/

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

