import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  usuario!:Usuario;
  formGroup!:FormGroup;
  emailErr:string = '';
  passErr:string = '';

  constructor(private _authService:AuthService,
    private fb:FormBuilder,
    private route:Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'email': ['', Validators.required] ,
      'password': ['', Validators.required] ,
       })
       this.usuario = new Usuario();
  }

  login(){
    this.emailErr = '';
    this.passErr = '';
    this._authService.getUserByEmail(this.usuario.email)
    .valueChanges()
    .subscribe((data:any) => {
      if(data){
        if(data[0].password == this.usuario.password){
          this._authService.isAuthenticated = true;
          this._authService.user = data[0];
          this.route.navigate(['/home']);
        }else{
          this.passErr = 'Password incorrecto';
        }
      }else{
        this.emailErr = 'Email incorrecto';
      }
    })
  }

  shortCutLogin(email:string, password:string){
    this.emailErr = '';
    this.passErr = '';
    this._authService.getUserByEmail(email)
    .valueChanges()
    .subscribe((data:any) => {
      if(data){
        if(data[0].password == password){
          this._authService.isAuthenticated = true;
          this._authService.user = data[0];
          this.route.navigate(['/home']);
        }else{
          this.passErr = 'Password incorrecto';
        }
      }else{
        this.emailErr = 'Email incorrecto';
      }
    })
  }
}
