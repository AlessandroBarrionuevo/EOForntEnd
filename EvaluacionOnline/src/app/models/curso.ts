import { AlumnosComponent } from "../components/admin/alumnos/alumnos.component";
import { Alumno } from "./alumno";

export interface Curso{
  nombre: string;
  descripcion: string;
  idProfesor: number;
  fechaInicio: string;
  fechaFin: string;
//  listaAlumnos: Alumno[];
 // estado: any;
}