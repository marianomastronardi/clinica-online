import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinica-online';
  isAuthenticated:boolean = false;
  constructor(private _authService:AuthService, 
    private route:Router){
      this.isAuthenticated = this._authService.isAuthenticated;
    this.route.navigate(['/welcome'])
  }
}
