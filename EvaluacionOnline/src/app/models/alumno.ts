import { ICurso } from "./curso";
import { Persona } from "./persona";

export class Alumno implements Persona{
  
  constructor( nombre:string, apellido: string, dni:number, mail: string, direccion: string, telefono: number ) {
    this.nombre = nombre, this.apellido = apellido, this.dni = dni, this.mail = mail, this.direccion = direccion,
    this.telefono = telefono;
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
}