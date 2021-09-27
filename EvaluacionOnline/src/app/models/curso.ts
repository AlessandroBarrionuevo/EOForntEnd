import { IInstitucion } from "./institucion";

export interface ICurso{
  id: number;
  nombre: string;
  descripcion: string;
  idProfesor: number;
  fechaInicio: Date;
  fechaFin: Date;
  estado: string;
  institucion: IInstitucion;
}