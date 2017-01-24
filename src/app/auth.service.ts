import { Injectable }      from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  // Configure Auth0
  lock = new Auth0Lock('VHnXH58XGAL7XOfqUs8cjY8cMMt5gv2L', 'enilsson.eu.auth0.com', {});

  constructor(private router: Router) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
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