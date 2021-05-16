import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import firebase from "firebase/app";
import "firebase/auth";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/models/especialidad';
import { EspecialidadesService } from 'src/app/services/especialidades.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  usuario!: Usuario;
  signUpError: string = '';
  credential: any = {};
  formGroup!: FormGroup;
  especialidades: Especialidad[] = [];
  userEspecialidades: Especialidad[] = [];
  newEspecialidad: Especialidad = new Especialidad();
  @Input() fromAddUser:boolean = false;
  deshabilitado:boolean = false;
  @Output() eventGoBeginning:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _authService: AuthService,
    private route: Router,
    private fb: FormBuilder,
    private _especialidadService: EspecialidadesService) {
    this.formGroup = this.fb.group({
      'nombre': ['', [Validators.required]],
      'apellido': ['', [Validators.required]],
      'edad': ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      'dni': ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      'os': ['', [this.osLengthValidator.bind(this)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
      'profile-img1': ['', [Validators.required]],
      'profile-img2': ['', [this.secImgValidator.bind(this)]],
    })
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this._especialidadService.getAll()
      .valueChanges()
      .subscribe((data: any) => {
        this.especialidades = (data) ? data : [];
        this.especialidades.sort((a, b) => (a.descripcion > b.descripcion ? 1 : -1));
      })
  }

  altaEspecialidad() {
    this._especialidadService.create(this.newEspecialidad);
    this.newEspecialidad = new Especialidad();
  }

  private osLengthValidator(control: AbstractControl): null | object {
    const os = <string>control.value;
    const len = os ? os.length : 0;
    if (!this == undefined) {
      if (len == 0) {
        return {
          noOS: true
        };
      } else {
        return null
      }
    } else {
      return null
    }
  }

  private secImgValidator(control: AbstractControl): null | object {
    const img = <string>control.value;
    const len = img ? img.length : 0;
    if (!this == undefined) {
      if (len == 0) {
        return {
          noImg: true
        };
      } else {
        return null
      }
    } else {
      return null
    }
  }

  signUp() {
    /* firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      this._authService.create(this.usuario);
      this._authService.user = this.usuario;
      this._authService.setUserAuthenticated();
      this.route.navigate(['home'])
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      this.signUpError = errorMessage;
      // ..
    }); */
    this.deshabilitado = true;
    this._authService.create(this.usuario);
    if(!this.fromAddUser){
      this._authService.user = this.usuario;
      this._authService.setUserAuthenticated();
      this.route.navigate(['home'])
    }else{
      this.usuario = new Usuario();
      this.eventGoBeginning.emit(false)
    }    
  }

  aceptar() {
    this.signUp()
  }

  onCheckboxChange(e: any) {
    if (e.target.checked) {
      let especialidad: Especialidad = new Especialidad();
      especialidad.descripcion = e.target.value;
      if(this.usuario.especialidad == undefined){
        this.usuario.especialidad = []
      }
      this.usuario.especialidad.push(Object.assign({}, especialidad));
    } else {
      const index = this.usuario.especialidad.findIndex(x => x.descripcion === e.target.value);
      this.usuario.especialidad.splice(index, 1);
    }
  }
}
