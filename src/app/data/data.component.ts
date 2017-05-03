import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { AuthService } from '../auth.service';
import { DbService } from '../dbservice.service';
import { Data } from '../data';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [AuthService, DbService]
})
export class DataComponent implements OnInit, OnDestroy {
  dataArray = [];
  sortBy: string = "createdAt";
  order: boolean = false;
  alwaysTrue: boolean = true;
  dataSubscription: AnonymousSubscription;
  selectedDevice: string = "";
  selectedDataId: string = "";

  constructor(private auth: AuthService, private dbService: DbService) { }

  //Add mock data - TEMPORARY until devices are connected for real
  addMockData() {
    this.dbService.addData().then((res) => {
      if (res == 200) {
        alert("You've now successfully added data");
      } else {
        alert("Adding data didn't really go your way");
      }
    });
  }

  removeSelected() {

    if (this.selectedDataId != undefined) {
      console.log(this.selectedDataId);
      this.dbService.removeData(this.selectedDataId).then((deleted) => {
        if (this.dataSubscription) {
          this.dataSubscription.unsubscribe();
        }
        this.getData();
      });
    }


  }

  cancelRemove() {
    this.selectedDataId = "";
  }

  selectData(id) {
    this.selectedDataId = id;
  }

  selectDevice(deviceId) {
    this.selectedDevice = deviceId;
  }

  sortData(arg) {
    if (this.sortBy == arg) {
      this.order = !this.order;
    } else {
      this.sortBy = arg;
    }
  }

  getData() {
    this.dbService.getAllData().then((data) => {
      console.log(data);
      if (data.length > 0) {
        this.dataArray = data;
      } else if (this.dataArray.length == 1 && data.length == 0) {
        console.log("DIDNT GET ANY DATA AND WE ALREADY HAVE A FAKERLINE");
      } else {
        var emptyData = new Data("", "", "You do not yet have any devices, add one to see it here", "", "");
        this.dataArray.push(data);
      }
      if(this.dataSubscription) {
        this.dataSubscription.unsubscribe();
      }
      this.subscribeToData();
    });
  }

  private subscribeToData(): void {
    this.dataSubscription = Observable.timer(10000).first().subscribe(() => this.getData());
  }

  ngOnInit() {
    this.getData();
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}
