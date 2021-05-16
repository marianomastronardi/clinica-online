import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated:boolean = false;
  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this._authService.isAuthenticated;
  }

}
