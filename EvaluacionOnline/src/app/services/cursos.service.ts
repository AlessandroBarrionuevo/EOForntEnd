import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurso } from '../models/curso';

@Injectable({
    providedIn: 'root'
})
export class CursosService {
    private _cursos: ICurso[];

    private readonly _apiURL: string = "api/curso"; //o cursos?

    constructor(private http: HttpClient) {
        this._cursos = [];
    }

    getCursos(): Observable<ICurso[]> {
        return this.http.get<ICurso[]>(this._apiURL);
    }

    getCursos2(): ICurso[] {
        return this._cursos;
    }

    getCursosById(cursoId: number): Observable<ICurso> {
        return this.http.get<ICurso>(this._apiURL + '/' + cursoId);
    }

    getCursosById2(cursoId: number): ICurso {
        return this._cursos.find(it => it.id == cursoId);
    }

    //post devuelve null, ya que la webapi devuelve void
    postCursos(curso: ICurso): Observable<ICurso> {
        return this.http.post<ICurso>(this._apiURL, curso);
    }

    postCursos2(curso: ICurso) {
        this._cursos.push(curso);
    }

    putCursos(curso: ICurso): Observable<ICurso> {
        return this.http.put<ICurso>(this._apiURL, curso);
    }

    putCursos2(curso: ICurso): void {
        let updateItem = this._cursos.find(it => it.id == curso.id);

        let index = this._cursos.indexOf(updateItem);

        this._cursos[index] = curso;
    }

    deleteCursos(cursoId: number): Observable<ICurso> {
        return this.http.delete<ICurso>(this._apiURL + '/' + cursoId)
    }

    deleteCursos2(cursoId: number) {
        let index = this._cursos.findIndex(it => it.id == cursoId);
        if (index != -1)
            this._cursos.splice(index, 1);
    }
}