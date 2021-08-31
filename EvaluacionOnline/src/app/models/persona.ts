import { Usuario } from "./usuario";

export interface Persona {
  nombre: string;
  apellido: string;
  dni: number;
  mail: string;
  direccion: string;
  telefono: number;
  idUsuario: number;
}