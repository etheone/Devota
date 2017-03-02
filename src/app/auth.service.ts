import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response, Request } from '@angular/http';
import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { environment } from '../environments/environment';

// Avoid name not found warnings
declare var Auth0Lock: any;


@Injectable()
export class AuthService {
  // Configure Auth0
  options = {
    theme: {
      logo: 'assets/img/logo-dark.png',
      primaryColor: '#252126'
    },
    additionalSignUpFields: [
      {
        name: "full_name",
        placeholder: "Enter your full name",
        icon: "/assets/img/icon-house.png"
      }]
  }

  private lock = new Auth0Lock('VHnXH58XGAL7XOfqUs8cjY8cMMt5gv2L', 'enilsson.eu.auth0.com', this.options);
  private profile: Object;

  constructor(private router: Router, public authHttp: AuthHttp) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      this.lock.getProfile(authResult.idToken, (error: any, profile: any): void => {
        if (error) {
          throw error;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        this.profile = profile;

      });
      this.loginToBackend();
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    // Logout the user
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/login']);

    // Send the user back to the startpage after logout

  }

  private loginToBackend(): Promise<any> {

    var that = this;
    return this.authHttp.get(environment.url + "/api/authenticate")


      .toPromise()
      .then(function (res: Response) {
        if (res.status == 200) {
          console.log(res.text());
          that.router.navigate(['./dashboard']);
        } else {
          console.log("DID NOT GET A 200 RESPONSE FROM BACKEND DURING AUTHENTICATE");
        }
      })
      .catch(this.handleError);
  }


  private goToDashboard(res: Response) {
    if (res.status == 200) {

      //this.router.navigate(['./dashboard']);
    } else {
      console.log("DID NOT GET A 200 RESPONSE FROM BACKEND DURING AUTHENTICATE");
    }
  }

  /*  private extractData(res: Response) {
    let reset = res.json();
    
    
    
    return reset;

  }*/
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