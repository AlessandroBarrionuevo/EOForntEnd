export interface IInstitucion {
  id: number;
  nombre: string;
  direccion: string;
  cuit: string;
}

export class Institucion {
    constructor(
        nombre: string,
        direccion: string,
        cuit: string
    ) { 
        this.nombre = nombre;
        this.direccion = direccion;
        this.cuit = cuit;
    }
  id: number;
  nombre: string;
  direccion: string;
  cuit: string;
}
