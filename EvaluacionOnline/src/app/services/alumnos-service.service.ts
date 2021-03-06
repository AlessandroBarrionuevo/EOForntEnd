import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno';
import { ICurso } from '../models/curso';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AlumnosServiceService {
  private _cursos: ICurso[] = [
    {
      id: 1,
      nombre: "Programacion IV",
      idProfesor: 2,
      descripcion: "programacion en angular",
      fechaInicio: "09-08-2021",
      fechaFin: "09-12-2021",
      estado: "Abierto",
      institucionId: 1010,
    },
    {
      id: 2,
      nombre: 'tecnicas avanzadas de programacion',
      idProfesor: 5,
      descripcion: "programacion en kotlin",
      fechaInicio: "12-08-2021",
      fechaFin: "12-12-2021",
      estado: "Abierto",
      institucionId: 1010,
    }
  ];


  listaAlumnos: Alumno[] = [
    // {
    //   "nombre": 'alessandro', "apellido": 'barrionuevo', "direccion": 'gn2438', "dni": 41709052,
    //   "mail": 'asd@gmail.com', "telefono": 123, "matricula": 1231564, "listaCursos": this.a, idUsuario: 3
    // },
    // {
    //   "nombre": 'sebastian', "apellido": 'kustiff', "direccion": 'ds2438', "dni": 41709051,
    //   "mail": 'sads@gmail.com', "telefono": 12123, "matricula": 123134564, "listaCursos": this.a, idUsuario: 4
    // }
  ]

  token = {
    "Token": "asdasdasdasdasdasdasdasdasd123"
  }
    

  constructor(private htppClient: HttpClient) { }


  buscarAlumnoEnListaPorId(id: number): Alumno {
    let alumnoEncontrado: Alumno;
    alumnoEncontrado = this.listaAlumnos.find(x => x.idUsuario == id);

    return alumnoEncontrado;
  }

  modificarAlumno(alumno: Alumno) {
    this.listaAlumnos.map((alumnoPasado: Alumno) => {
      if (alumno.matricula == alumnoPasado.matricula) {
        alumno.nombre = alumnoPasado.nombre;
        alumno.apellido = alumnoPasado.apellido;
        alumno.direccion = alumnoPasado.direccion;
        alumno.mail = alumnoPasado.mail;
        alumno.telefono = alumnoPasado.telefono;
      }
    })
  }

  
  obtenerListadoAlumnos(): Alumno[] {
    return this.listaAlumnos;
  }

  //api
  obtenerAlumnoPorId(id: number) {
    return this.htppClient.get<any>('/api/Alumno/' + id);
  }

  listadoAlumnos(): Observable<any> {
    return this.htppClient.get<any>('/api/Alumno');
  }

  crearAlumno(alumno: any): Observable<any> {
    return this.htppClient.post('/api/Alumno', alumno);
  }

  borrarAlumno(id: number) {
    return this.htppClient.delete('/api/Alumno/' + id);
  }

  modificarAlumnoHttp(alumno: any) {
    return this.htppClient.put('/api/Alumno', alumno);
  }
}
