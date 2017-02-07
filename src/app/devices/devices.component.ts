import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DbService } from '../dbservice.service';
import { Device } from '../device';
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
  editingId: string = "";
  constructor(private auth: AuthService, private dbService: DbService) { }

  createDevice(name, desc) {
    this.dbService.createDevice(name, desc).then((device) => {
      //console.log("Response from /devices/create:");
      //console.log(res);
      console.log("Here");
      console.log(this.devices.length);
      if (this.devices.length < 2) {
        if (this.devices[0].name = "") {
          this.devices[0] = device;
        }
      } else {
        this.devices.push(device);
      }

    });

    this.name = "";
    this.desc = "";
    this.fieldsOk = false;
  }

  updateDevice(name, desc) {
    this.dbService.updateDevice(this.editingId, name, desc).then((device) => {
      console.log("Response from /devices/create:");
      console.log(device);
      console.log("promise after editDevice");
     
    });
    this.name = "";
    this.desc = "";
    this.editingId = "";
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
      console.log("Devices: ");
      console.log(devices);
      if (devices.valueOf() != -1) {
        this.devices = devices;
      } else {
        var emptyDevice = new Device("", "", "You do not yet have any devices, add one to see it here", "");
        this.devices.push(emptyDevice);
      }
    });
  }

  ngDoCheck() {
    this.isValid();

  }

  ngOnInit() {
    this.getDevices();
  }

}
