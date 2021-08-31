import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class AlumnosServiceService {
  a: Curso[] = [
    { "nombre": "prog web" }, { "nombre": 'servidores'}
  ]
  listaAlumnos: Alumno[] = [
    {
      "nombre": 'alessandro', "apellido": 'barrionuevo', "direccion": 'gn2438', "dni": 41709052,
      "mail": 'asd@gmail.com', "telefono": 123, "matricula": 1231564, "listaCursos": this.a, idUsuario: 1
    },
    {
      "nombre": 'sebastian', "apellido": 'kustiff', "direccion": 'ds2438', "dni": 41709051,
      "mail": 'sads@gmail.com', "telefono": 12123, "matricula": 123134564, "listaCursos": this.a, idUsuario: 2
    }
  ]

  constructor() { }

  obtenerListadoAlumnos(): Alumno[] {
    return this.listaAlumnos;
  }

  
  
}
