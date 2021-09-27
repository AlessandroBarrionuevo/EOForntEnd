import { ICurso } from "./curso";
import { Persona } from "./persona";

export class Profesor implements Persona {
    nombre: string;
    apellido: string;
    dni: number;
    mail: string;
    direccion: string;
    telefono: number;
    idUsuario: number;

    id: number;
    listaCursos: ICurso[];

    constructor(nombre: string, apellido: string, dni: number, mail: string, direccion: string, telefono: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.mail = mail;
        this.direccion = direccion;
        this.telefono = telefono;
        this.listaCursos = [];
        this.id = null;
    }

}