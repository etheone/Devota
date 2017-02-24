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

  order: boolean = true;
  sortBy: string = "updatedAt";

  editingId: string = "";
  modalName: string = "";
  modalDescription: string = "";

  constructor(private auth: AuthService, private dbService: DbService) { }

  sortDevices(arg) {
    if (this.sortBy == arg) {
      this.order = !this.order;
    } else {
      this.sortBy = arg;
    }
  }

  createDevice(name, desc) {
    this.dbService.createDevice(name, desc).then((device) => {
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
      console.log(name);
      this.updateDeviceFields(this.editingId, name, desc);
      this.name = "";
      this.desc = "";
      this.editingId = "";
      this.modalName = "";
      this.modalDescription = "";
      this.fieldsOk = false;
    });


  }

  clearModalFields() {
    this.name = "";
    this.desc = "";
    this.editingId = "";
    this.modalName = "";
    this.modalDescription = "";
    this.fieldsOk = false;
  }

  editDevice(id, name, desc) {
    this.editingId = id;
    this.modalName = name;
    this.modalDescription = desc;
    this.name = name;
    this.desc = desc;
  }

  updateDeviceFields(id, name, description) {
    for (var i in this.devices) {
      if (this.devices[i].id == id) {
        this.devices[i].device_name = name;
        this.devices[i].description = description;
        break; //Stop this loop, we found it!
      }
    }

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
        console.log("Devices");
        console.log(this.devices);
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
