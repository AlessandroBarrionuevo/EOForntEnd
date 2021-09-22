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