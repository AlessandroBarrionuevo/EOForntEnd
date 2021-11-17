import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
<<<<<<< Updated upstream
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
=======
  constructor(public autho: AuthService, private http: HttpClient) { }
  
  getUsuarios() : Observable<any>{
    return this.http.get("/api/User");
>>>>>>> Stashed changes
  }

  obtenerDatosDeUsuario(): any {
    let datos: string;

<<<<<<< Updated upstream
    if (this.autho.isAuthenticated$) {
      this.autho.user$.subscribe(
      (profile) => (datos = JSON.stringify(profile, null))
=======
  usuarioPorId(usuario: any): Observable<any> { 
    return this.http.get<any>(`/api/User?id=${usuario}`);
  }

  editRol(usuario: any): Observable<any>{
    return this.http.post<any>("/api/Admin/AddRole", usuario);
  }
  
  removeRol(usuario: any, rol: any): Observable<any>{
    return this.http.delete<any>("/api/Admin/Roles/" + usuario.id + "/" + rol);
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
>>>>>>> Stashed changes
    );
    }
  }
<<<<<<< Updated upstream
=======

  delete(id: string) : Observable<any>{
    return this.http.delete("api/User/" + id);
  }
>>>>>>> Stashed changes
}
