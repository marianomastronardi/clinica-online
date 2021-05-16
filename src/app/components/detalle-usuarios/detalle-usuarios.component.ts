import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-detalle-usuarios',
  templateUrl: './detalle-usuarios.component.html',
  styleUrls: ['./detalle-usuarios.component.css']
})
export class DetalleUsuariosComponent implements OnInit {

  @Input() listaUsuarios!:Usuario[];
  @Output() eventManageAccount:EventEmitter<Usuario> = new EventEmitter<Usuario>();

  constructor() { }

  ngOnInit(): void {
  }

  manageAccount(user:Usuario){
    console.log(user)
    user.isValidAccount = !user.isValidAccount;
    this.eventManageAccount.emit(user)
  }
}
