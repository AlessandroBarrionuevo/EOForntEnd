import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
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
  
  constructor(public autho: AuthService, private http: HttpClient) { }

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

  registrarUsuario(usuario: any) {
    return this.http.post('/api/Admin/Register', usuario);
  }

  registrarAlumno(alumno: any) {
    return this.http.post('/api/User', alumno);
  }

  LoginUsuario(usuario: any) {
    return this.http.post('/api/Login', usuario);
  }

  usuarioPorId(usuario: any): Observable<any> { 
    return this.http.get<any>(`/api/User/${usuario}`);
  }
  
  usuariobyID(usuario: any): boolean {
    this.usuarioPorId(usuario).subscribe(
      (r) => {
        if (r.rol == null) { 
          return true;
        }
      },
      (err) => {
        return false;
      }
    );
    return false
  }

}
