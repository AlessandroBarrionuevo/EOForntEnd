import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPregunta } from '../models/IPregunta';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService{

    private readonly _apiPreguntasURL = "api/preguntas";

    private readonly _apiPreguntasDesarrollarURL: string = "api/preguntas/desarrollar";

    constructor(private http: HttpClient) {}

    getPreguntaById(id: number): Observable<IPregunta> { 
        return this.http.get<IPregunta>(this._apiPreguntasURL + "/" + id)
    }

    postPregunta(pregunta: any): Observable<any> { 
        return this.http.post<any>(this._apiPreguntasDesarrollarURL, pregunta)
    }

    putPregunta(pregunta: any) { 
        return this.http.put(this._apiPreguntasDesarrollarURL, pregunta)
    }

    deletePregunta(id: number) { 
        return this.http.delete(`${this._apiPreguntasURL}/${id}`)
    }
}