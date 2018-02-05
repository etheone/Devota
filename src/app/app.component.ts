import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: []

})
export class AppComponent {
  menuVisible = false;
  startPageMenuHidden = false;

  constructor(private router: Router) {
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
