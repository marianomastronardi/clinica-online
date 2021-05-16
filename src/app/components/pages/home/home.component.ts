import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:Usuario;
  estado:boolean = false;
  anchoGif:number = 50;
  rutaDeGif:string = '/assets/ajax-loader.gif';
  constructor(private _authService:AuthService) { 
    this.user = this._authService.user;
    setTimeout(() => {
      this.estado = true;
    }, 1000);
  }

  ngOnInit(): void {
  }

  logOut(){
    this._authService.logout()
  }
}
