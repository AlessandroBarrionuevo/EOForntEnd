import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  listaUsuarios: Usuario[] = [
    { id: 1, nickName: 'admin', password: 'admin', idRol: 1 }, { id: 2, nickName: 'profeA', password: 'profeA', idRol: 2 },
    { id: 3, nickName: 'ale', password: 'ale', idRol: 3 }, { id: 4, nickName: 'seba', password: 'seba', idRol: 3 }
    ,{ id: 5, nickName: 'profeB', password: 'profeB', idRol: 2 }
  ]
  
  constructor() { }

  listadoUsuarios(): Usuario[] {
    return this.listaUsuarios;
  }

  BuscarUsuarioEnListaPorLogin(nickName: string, password: string): Usuario {
    let usuarioEncontrado: Usuario;
    usuarioEncontrado = this.listaUsuarios.find(x => x.nickName == nickName && x.password == password);

    return usuarioEncontrado;
  }

  BuscarUsuarioEnListaPorId(id: number): Usuario {
    let usuarioEncontrado: Usuario;
    usuarioEncontrado = this.listaUsuarios.find(x => x.id == id);

    return usuarioEncontrado;
  }

}
