export class EstadoHelper {
    public static readonly _sEstados = [
        {nombre: "Inscrito", id: 0},
        {nombre: "Cursando", id: 1},
        {nombre: "Aprobado", id: 2},
        {nombre: "Desaprobado", id: 3},
    ];

    public static getEstadoId(estado: string): number {
        for (let i = 0; i < this._sEstados.length; ++i) {
            if (this._sEstados[i].nombre.toLowerCase() == estado.toLowerCase())
                return this._sEstados[i].id;
        }
        return -1;
    }

    public static getEstadoName(id: number) : string{
        for (let i = 0; i < this._sEstados.length; ++i) {
            if (this._sEstados[i].id == id)
                return this._sEstados[i].nombre;
        }
        return "";
    }
}