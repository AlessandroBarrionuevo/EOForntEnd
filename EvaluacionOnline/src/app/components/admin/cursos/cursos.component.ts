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
        let tempCursos = this.cursoService.getCursos2();
        console.dir(tempCursos);

        this._map.clear();
        for (var i = 0; i < tempCursos.length; ++i)
            this._map.set(tempCursos[i], false);

        /*this.cursoService.getCursos().subscribe(
            data =>{
                for(var i = 0; i < data.length; ++i)
                    this._map.set(data[i], false);
            }
        );*/
        
        //instituciones
        this.institucionService.getInstituciones().subscribe(
            instituciones => { 
                if (instituciones.length > 0) {
                    let tempMap = new Map<ICurso, boolean>();

                    this._map.forEach((value, key) => {
                        let curso: ICurso = {
                            id: key.id,
                            nombre: key.nombre,
                            descripcion: key.descripcion,
                            estado: key.estado,
                            fechaInicio: key.fechaInicio,
                            fechaFin: key.fechaFin,
                            idProfesor: key.idProfesor,
                            institucion: key.institucion
                        }
                        tempMap.set(curso, value);
                    });

                    this._map.clear();
                    tempMap.forEach((value, key) => {
                        this._map.set(key, value);
                    });

                    this._enableCRUDButtons = true;
                }
            },
            error => {
                this._enableCRUDButtons = true;
                console.error(error);
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
        this.router.navigate(["/cursos/cou", { id: "" }]);
    }

    //Envia al form para modificar curso
    public edit(curso: ICurso): void {
        this.router.navigate(["/cursos/cou", { id: curso.id }]);
    }

    //elimina UN curso
    public delete(curso: ICurso): void {
        this._enableCRUDButtons = false;

        this.cursoService.deleteCursos2(curso.id);

        this.getAllData();
        /*
                this.cursoService.deleteCursos(curso.id).subscribe(
                    data => {
                        console.log(data);
                        console.dir(curso);
        
                        this.getAllData();
                    },
                    error => {
                        this._enableCRUDButtons = true;
                        console.log(error);
                    }
                )*/
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