import { Component, OnInit } from '@angular/core';
import { DbService } from '../dbservice.service';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [DbService]
})
export class DataComponent implements OnInit {

  constructor(private dbService: DbService) { }

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

  ngOnInit() {
  }

}
