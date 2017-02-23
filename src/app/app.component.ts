import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AuthService]

})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) { }
  menuVisible = false;

  menuClicked() {
    this.menuVisible = !this.menuVisible
  }
}
