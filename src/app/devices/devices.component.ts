import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DbService } from '../dbservice.service';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  providers: [AuthService, DbService]
})
export class DevicesComponent implements OnInit {
  fieldsOk = false;
  devices = [];
  name: string = "";
  desc: string = "";
  constructor(private auth: AuthService, private dbService: DbService) { }

  createDevice(name, desc) {
    this.dbService.createDevice(name, desc).then((device) => {
      //console.log("Response from /devices/create:");
      //console.log(res);
      this.devices.push(device);
    });

    this.name = "";
    this.desc = "";
    this.fieldsOk = false;
  }

  isValid() {
    return (this.name.length > 0 && this.desc.length > 0);
/*    if (this.name.length > 0 && this.desc.length > 0) {
      this.fieldsOk = true;
    } else {
      this.fieldsOk = false;
    }*/
  }

  getDevices() {
    this.dbService.getDevices().then((devices) => {
      this.devices = devices;
    });
  }

  ngDoCheck() {
    this.isValid();

  }

  ngOnInit() {
    this.getDevices();
  }

}
