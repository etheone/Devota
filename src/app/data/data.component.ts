import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DbService } from '../dbservice.service';
import { Data } from '../data';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [AuthService, DbService]
})
export class DataComponent implements OnInit {
  data = [];

  constructor(private auth: AuthService, private dbService: DbService) { }

  //Add mock data - TEMPORARY until devices are connected for real
  addMockData() {
    this.dbService.addData().then((res) => {
      if(res == 200) {
        alert("You've now successfully added data");
      } else {
        alert("Adding data didn't really go your way");
      }
    });
  }
/*
  getData() {
    this.dbService.getData().then((data) => {
      console.log("Data: ");
      console.log(data);
      if (data.valueOf() != -1) {
        this.data = data;
      } else {
        var emptyDevice = new Data("", "", "You do not yet have any devices, add one to see it here", "");
        this.data.push(data);
      }
    });
  }
*/
  ngOnInit() {
    //this.getData();
  }

}
