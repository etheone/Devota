import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;


@Injectable()
export class AuthService {
  // Configure Auth0
  options = {
    additionalSignUpFields: [
      {
        name: "full_name",
        placeholder: "Enter your full name",
        icon: "/assets/img/icon-house.png"
      }]
  }

  private lock = new Auth0Lock('VHnXH58XGAL7XOfqUs8cjY8cMMt5gv2L', 'enilsson.eu.auth0.com', this.options);
  private profile: Object;
  
  constructor(private router: Router) {
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

    // Send the user back to the startpage after logout

  }
}