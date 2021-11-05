export interface ICurso{


  id: number;
  nombre: string;
  descripcion: string;
  idProfesor: number;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  institucionId: number;
}

export class Curso{

  constructor(nombre: string, descripcion: string, fechaInicio: string, fechaFin: string) {
    this.nombre = nombre,
    this.descripcion = descripcion,
    this.fechaInicio = fechaInicio,
    this.fechaFin = fechaFin
  }

  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
}