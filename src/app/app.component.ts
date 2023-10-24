import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI';
  isLoggedIn!:boolean;
  constructor(private authService :AuthService){ }
  checkLoggedInUser(){this.isLoggedIn= this.authService.isLoggedIn();}
  logout(){ this.authService.logout(); }
}
