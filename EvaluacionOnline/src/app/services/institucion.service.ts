import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInstitucion } from '../models/institucion';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService{

    private readonly _apiURL: string = "api/Institucion";

    constructor(private http: HttpClient) {}

    getInstituciones(): Observable<IInstitucion[]> {
        return this.http.get<IInstitucion[]>(this._apiURL);
    }

    getInstitucionById(institucionId: number): Observable<IInstitucion> {
        return this.http.get<IInstitucion>(this._apiURL + '/' + institucionId);
    }

    //por implementar en la api
    getInstitucionByName(institucionName: string): Observable<IInstitucion>{
        return this.http.get<IInstitucion>(this._apiURL + '/get-by-name/' + institucionName);
    }

    //post devuelve null, ya que la webapi devuelve void
    postInstitucion(institucion: IInstitucion): Observable<IInstitucion> {
        return this.http.post<IInstitucion>(this._apiURL, institucion);
    }

    putInstitucion(institucion: IInstitucion): Observable<IInstitucion> {
        return this.http.put<IInstitucion>(this._apiURL, institucion);
    }

    deleteInstitucion(institucionId: number): Observable<IInstitucion> {
        return this.http.delete<IInstitucion>(this._apiURL + '/' + institucionId)
    }

    //metodos ale
    obtenerIntituciones(): Observable<any> { 
        return this.http.get<any>(this._apiURL)
    }

    obtenerIntitucionPorId(id: number): Observable<any> { 
        return this.http.get<any>(this._apiURL + "/" + id)
    }

    crearInstitucion(institucion: any): Observable<any> { 
        return this.http.post<any>(this._apiURL, institucion)
    }

    modificarInstitucion(institucion: any) { 
        return this.http.put(this._apiURL, institucion)
    }

    borrarInstitucion(id: number) { 
        return this.http.delete(`${this._apiURL}/${id}`)
    }
}