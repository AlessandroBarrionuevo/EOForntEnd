import { Component, OnInit } from '@angular/core';
import { InstitucionService } from 'src/app/services/institucion.service';

import { ICurso } from 'src/app/models/curso';

import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
    templateUrl: './cursos.component.html',
    styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

    public _map: Map<ICurso, boolean>;

    public _enableCRUDButtons: boolean;

    public _selectAll: boolean;

    constructor(
        private institucionService: InstitucionService,
        private cursoService: CursosService,
        private router: Router) {

        this._selectAll = false;

        this._enableCRUDButtons = false;

        this._map = new Map<ICurso, boolean>();

    }

    ngOnInit(): void {
        this.getAllData();
    }

    private getAllData() {
        this.cursoService.getCursos().subscribe(
            cursos =>{
                this._map.clear();

                for(var i = 0; cursos.length; ++i)
                    this._map.set(cursos[i], false);
                
                this._enableCRUDButtons = true;
            },
            error =>{
                console.error(error);

                this._enableCRUDButtons = true;
            }
        );
    }

    //selecciona TODAS las instituciones
    public selectAll() {
        this._selectAll = !this._selectAll;

        this._map.forEach((value, key) => {
            this._map.set(key, this._selectAll);
        });
    }

    //selecciona UN curso
    public select(curso: ICurso, isSelected: boolean) {
        this._map.set(curso, !isSelected);
    }

    //Envia al form para crear un curso
    public create(): void {
        //InstitucionForm._sIsEditMode = false;
        this.router.navigate(["/cursos/", -1]);
    }

    //Envia al form para modificar curso
    public edit(curso: ICurso): void {
        //InstitucionForm._sIsEditMode = true;
        this.router.navigate(["/cursos/", curso.id]);
    }

    //elimina UN curso
    public delete(curso: ICurso): void {
        this._enableCRUDButtons = false;

        this.institucionService.deleteInstitucion(curso.id).subscribe(
            data => {
                console.log(data);
                console.dir(curso);

                this.getAllData();
            },
            error => {
                this._enableCRUDButtons = true;
                console.log(error);
            }
        )
    }

    //Elimina los cursos seleccionados, uno por uno
    public deleteSelected(): void {
        this._map.forEach((value, key) => {
            if (value)
                this.delete(key);
        });

        this._selectAll = false;
    }
}