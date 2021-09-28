import { Persona } from "./persona";


export class User implements Persona{
  constructor( token: any, mail: string, apellido: string, nombre: string, dni: any, direccion: string, telefono: any) {
    this.token = token,
    this.mail = mail,
    this.apellido = apellido,
    this.nombre = nombre,
    this.dni = dni,
    this.direccion = direccion,
    this.telefono = telefono
  }
  
  idUsuario: number;
  nombre: string;
  apellido: string;
  dni: any;
  mail: string;
  direccion: string;
  telefono: any;
  token: any;
}

// {
//   "Token": "asdasdasdasdasdasdasdasdasd123",
//   "mail": "alessandrobarrionuevo1@gmail.com",
//   "apellido": "barrionuevo",
//   "nombre": "ale",
//   "dni": "41709052",
//   "direccion": "direccion asd",
//   "telefono": "1164496163"
// }
