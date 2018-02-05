import { Component, OnInit } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
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
  
  quickstartOpen = [];
  quickstartContent = [];

  advancedOpen = [];
  advancedContent = [];
  
  constructor(private auth: AuthService, private dbService: DbService) { }

  ngOnInit() {
    this.getQuickstart();
    this.getAdvanced();
  }

  quickstartClicked(i) {
    this.quickstartOpen[i] = !this.quickstartOpen[i];
  }

  advancedClicked(i) {
    this.advancedOpen[i] = !this.advancedOpen[i];
  }

  getQuickstart() {
    this.dbService.getQuickstart().then((quickstart) => {
      this.quickstartContent = quickstart;
    });
  }

  getAdvanced() {
    this.dbService.getAdvanced().then((advanced) => {
      this.advancedContent = advanced;
    });
  }

}
