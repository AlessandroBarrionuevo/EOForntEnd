import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
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
  
  constructor(public autho: AuthService) { }

  listadoUsuarios(): Usuario[] {
    return this.listaUsuarios;
  }

  BuscarUsuarioEnListaPorLogin(nickName: string): Usuario {
    let usuarioEncontrado: Usuario;
    usuarioEncontrado = this.listaUsuarios.find(x => x.nickName == nickName);

    return usuarioEncontrado;
  }

  BuscarUsuarioEnListaPorId(id: number): Usuario {
    let usuarioEncontrado: Usuario;
    usuarioEncontrado = this.listaUsuarios.find(x => x.id == id);

    return usuarioEncontrado;
  }

  obtenerDatosDeUsuario(): any {
    let datos: string;

    if (this.autho.isAuthenticated$) {
      this.autho.user$.subscribe(
      (profile) => (datos = JSON.stringify(profile, null))
    );
    }
  }
}
