import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  esAltaUsuario:boolean = false;
  listaUsuarios!:Usuario[];

  constructor(private _authService:AuthService) { }

  ngOnInit(): void {
    this._authService.getAll()
    .snapshotChanges()
      .pipe(
        map(changes => 
          changes.map((c: any) => {
            return ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          }
          )
        )
    )
    .subscribe((data: any) => {
      console.log(data)
      this.listaUsuarios = data;
    })
  }

  manageAccount(u:any){
    console.log(u)
    this._authService.update(u.id,u);
  }

  goToAddUser(){
    this.esAltaUsuario = !this.esAltaUsuario;
  }

  onChangeAltaUsuario(estado:boolean){
    this.esAltaUsuario = estado;
  }
}
