export interface Usuario {
  id: number;
  nickName: string;
  password: string;
  idRol: number;
}

export class usuarioBackOffice {
  constructor(userName:string, nombre: string, apellido: string, email: string, rol: string) {
    this.userName = userName;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.rol = rol;
  }
  
  userName: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}
