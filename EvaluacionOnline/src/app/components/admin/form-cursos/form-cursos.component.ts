import { Component, OnInit } from '@angular/core';
import { InstitucionService } from 'src/app/services/institucion.service';
import { CursosService } from 'src/app/services/cursos.service';

import { ICurso } from 'src/app/models/curso';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IInstitucion } from 'src/app/models/institucion';

@Component({
    templateUrl: './form-cursos.component.html',
    styleUrls: ['./form-cursos.component.css']
})
export class CursosFormComponent implements OnInit {

    public static _sIsEditMode: boolean;

    public _form: FormGroup;

    public _instituciones: IInstitucion[];

    public _institucionSelected: number;

    public constructor(
        private institucionService: InstitucionService,
        private cursosService: CursosService,
        private formBuilder: FormBuilder) {

        this._institucionSelected = -1;

        this._form = this.formBuilder.group({
            nombre: new FormControl("", [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(16)
            ]),
            descripcion: new FormControl("", [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(128)
            ]),
            profesor: new FormControl("Por implementar"),
            fechaInicio: new FormControl(new Date(), [
                Validators.required,
            ]),
            fechaFin: new FormControl(new Date(), [
                Validators.required,
            ]),
            estado: new FormControl("", [
                Validators.required,
            ]),
            institucion: new FormControl()
        });
    }

    public ngOnInit(): void {
        this.institucionService.getInstituciones().subscribe(
            instituciones => {
                this._instituciones = instituciones;

                console.dir(this._instituciones);

                for (let i = 0; i < this._instituciones.length; ++i)
                    this.institucion.setValue(this._instituciones[i]);

                if(this._instituciones.length > 0)
                    this._institucionSelected = 0;
            },
            error => {
                console.log(error);
            }
        );
    }

    public get nombre() {
        return this._form.get("nombre");
    }

    public get descripcion() {
        return this._form.get("descripcion");
    }

    public get profesor() {
        return this._form.get("profesor");
    }

    public get fechaInicio() {
        return this._form.get("fechaInicio");
    }

    public get fechaFin() {
        return this._form.get("fechaFin");
    }

    public get estado() {
        return this._form.get("estado");
    }

    public get institucion() {
        return this._form.get("institucion");
    }

    public get isEditMode(): boolean {
        return CursosFormComponent._sIsEditMode;
    }

    public create() {

    }

    public edit() {

    }
}