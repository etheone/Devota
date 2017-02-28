import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthService]

})
export class AppComponent {
  menuVisible = false;
  startPageMenuHidden = false;

  constructor(private auth: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        if (event.url == "/login") {
          this.startPageMenuHidden = true;
        } else {
          this.startPageMenuHidden = false;
        }
      }
    });
  }

  menuClicked() {
    this.menuVisible = !this.menuVisible
  }
}
