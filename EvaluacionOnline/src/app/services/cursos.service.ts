import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, scheduled, Subscriber } from 'rxjs';
import { ICurso } from '../models/curso';

import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CursosService {
    private _cursos: ICurso[] = [
        {
            id: 1,
            nombre: "Programacion IV",
            idProfesor: 2,
            descripcion: "programacion en angular",
            fechaInicio: "09-08-2021",
            fechaFin: "09-12-2021",
            estado: "Abierto",
            institucionId: 1010,
        },
        {
            id: 2,
            nombre: 'tecnicas avanzadas de programacion',
            idProfesor: 5,
            descripcion: "programacion en kotlin",
            fechaInicio: "12-08-2021",
            fechaFin: "12-12-2021",
            estado: "Abierto",
            institucionId: 1010,
        }
    ];

    private readonly _apiURL: string = "api/curso"; //o cursos?

    constructor(private http: HttpClient) { }

    getCursos(): Observable<ICurso[]> {
        return new Observable((observer: Subscriber<any>) => {
            this._cursos.forEach( (value, index) =>{
                observer.next(value);
            });

              observer.complete();
        });

        //return this.http.get<ICurso[]>(this._apiURL);
    }

    getCursosById(cursoId: number): Observable<ICurso> {
        return Observable.create((observer: Subscriber<any>) => {
            observer.next(this._cursos.find(it => it.id == cursoId));

            observer.complete();
        });
        //return this.http.get<ICurso>(this._apiURL + '/' + cursoId);
    }

    //post devuelve null, ya que la webapi devuelve void
    postCursos(curso: ICurso): Observable<ICurso> {
        return Observable.create((observer: Subscriber<any>) => {
            observer.next(this._cursos.push(curso));

            observer.complete();
        });
        //return this.http.post<ICurso>(this._apiURL, curso);
    }

    private internalUpdateCurso(curso: ICurso) {
        let updateItem = this._cursos.find(it => it.id == curso.id);

        let index = this._cursos.indexOf(updateItem);

        this._cursos[index] = curso;
    }

    putCursos(curso: ICurso): Observable<ICurso> {
        return Observable.create((observer: Subscriber<any>) => {
            observer.next(this.internalUpdateCurso(curso));

            observer.complete();
        });

        //return this.http.put<ICurso>(this._apiURL, curso);
    }

    private internalDeleteCurso(cursoId: number) {
        let index = this._cursos.findIndex(it => it.id == cursoId);
        if (index != -1)
            delete this._cursos[index];
    }

    deleteCursos(cursoId: number): Observable<ICurso> {
        return Observable.create((observer: Subscriber<any>) => {
            observer.next(this.internalDeleteCurso(cursoId));

            observer.complete();
        });

        //return this.http.delete<ICurso>(this._apiURL + '/' + cursoId)
    }

    //cursos por ale
    obtenerTodosLosCursos():Observable<any> { 
        return this.http.get<any>(this._apiURL)
    }

    obtenerCursoPorId(id: number):Observable<any>{  
        return this.http.get<any>(`${this._apiURL}/${id}`)
    }

    crearCurso(curso: any) { 
        return this.http.post(this._apiURL, curso)
    }

    modificarCurso(curso: any) { 
        return this.http.put(this._apiURL, curso);
    }

    borrarCurso(id: number) { 
        return this.http.delete(`${this._apiURL}/${id}`)
    }
}