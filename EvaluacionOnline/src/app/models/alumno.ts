import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { ICurso } from './curso';
import { Persona } from './persona';

export class Alumno implements Persona {
  constructor(
    userName: string,
    mail: string,
    nombre: string,
    apellido: string
  ) {
    (this.userName = userName),
    (this.email = mail),
    (this.nombre = nombre),
    (this.apellido = apellido),
    (this.mail = mail);
  }
  nombre: string;
  apellido: string;
  dni: number;
  mail: string;
  direccion: string;
  telefono: number;
  idUsuario: number;
  matricula: number;
  listaCursos: ICurso[];
  id: number;
  token: any;
  userName: string;
  normalizedUserName: string;
  email: string;
}
