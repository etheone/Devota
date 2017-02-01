import { Injectable } from '@angular/core';
import { Response, Request, RequestOptions, Headers } from '@angular/http';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import { Device } from './device';

@Injectable()
export class DbService {

  constructor(public authHttp: AuthHttp) { }

  createDevice(name, description): Promise<any> {
    let device = JSON.stringify({ "deviceName": name, "description": description });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, method: "post" });

    return this.authHttp.post("http://localhost:3000/api/devices/create", device, options)

      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);


  }

  getDevices(): Promise<Device[]> {
    return this.authHttp.get("http://localhost:3000/api/devices/find")
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  

  private extractData(res: Response) {
    let reset = res.json();
    console.log(reset);
    return reset;
  }

  private handleError(error: Response | any) {

    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);

  }
}
