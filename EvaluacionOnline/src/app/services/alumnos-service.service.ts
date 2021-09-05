import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno';
import { Curso } from '../models/curso';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AlumnosServiceService {
  a: Curso[] = [
    { "nombre": "prog web", idProfesor: 2, descripcion: "programacion en angular", fechaInicio: "09-08-2021", fechaFin: "09-12-2021" },
    { "nombre": 'tecnicas avanzadas de programacion', idProfesor: 5, descripcion: "programacion en kotlin", fechaInicio: "12-08-2021", fechaFin: "12-12-2021" }
  ]
  listaAlumnos: Alumno[] = [
    {
      "nombre": 'alessandro', "apellido": 'barrionuevo', "direccion": 'gn2438', "dni": 41709052,
      "mail": 'asd@gmail.com', "telefono": 123, "matricula": 1231564, "listaCursos": this.a, idUsuario: 3
    },
    {
      "nombre": 'sebastian', "apellido": 'kustiff', "direccion": 'ds2438', "dni": 41709051,
      "mail": 'sads@gmail.com', "telefono": 12123, "matricula": 123134564, "listaCursos": this.a, idUsuario: 4
    }
  ]

  constructor() { }

  obtenerListadoAlumnos(): Alumno[] {
    return this.listaAlumnos;
  }

  buscarAlumnoEnListaPorId(id: number): Alumno {
    let alumnoEncontrado: Alumno;
    alumnoEncontrado = this.listaAlumnos.find(x => x.idUsuario == id);

    return alumnoEncontrado;
  }

  modificarAlumno(alumno: Alumno) {
    this.listaAlumnos.map((alumnoPasado: Alumno) => {
      if (alumno.matricula == alumnoPasado.matricula){
        alumno.nombre = alumnoPasado.nombre;
        alumno.apellido = alumnoPasado.apellido;
        alumno.direccion = alumnoPasado.direccion;
        alumno.mail = alumnoPasado.mail;
        alumno.telefono = alumnoPasado.telefono;
      } 
    })
  }


}
