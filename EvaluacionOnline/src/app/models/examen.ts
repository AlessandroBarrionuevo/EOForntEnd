export class Examen {
  constructor(
    nombre: string,
    estado: string,
    fecha: string,
    duracion: string,
    curso: number
  ) {
      (this.nombre = nombre),
      (this.estado = estado),
      (this.fecha = fecha),
      (this.duracion = duracion),
      (this.curso = curso);
  }
  id: number;
  nombre: string;
  estado: string;
  fecha: string;
  duracion: string;
  curso: number;
}
