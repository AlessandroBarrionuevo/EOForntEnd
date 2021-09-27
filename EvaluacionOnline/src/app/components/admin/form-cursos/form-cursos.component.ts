import { Component, OnInit } from '@angular/core';
import { InstitucionService } from 'src/app/services/institucion.service';
import { CursosService } from 'src/app/services/cursos.service';

import { ICurso } from 'src/app/models/curso';

import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IInstitucion } from 'src/app/models/institucion';

import { formatDate } from '@angular/common';

import { dateLessThan } from 'src/app/validators/dateLessThanValidator';
import { EstadoHelper } from 'src/app/helpers/EstadosHelper';

@Component({
    templateUrl: './form-cursos.component.html',
    styleUrls: ['./form-cursos.component.css']
})
export class CursosFormComponent implements OnInit {
    private _id: number;

    public _form: FormGroup;

    public _instituciones: IInstitucion[];

    public _institucionSelected: number;

    public _minDate: Date;

    public _maxDate: Date;

    public _usingService: boolean;

    public _isUpdateMode: boolean;

    public constructor(
        private institucionService: InstitucionService,
        private cursosService: CursosService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute) {

        this._usingService = false;

        this._institucionSelected = -1;

        this._minDate = new Date(new Date().getTime() + new Date(70, 0, 2).getTime());
        this._maxDate = new Date(new Date().getTime() + new Date(70, 1, 0).getTime());

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
            //profesor: new FormControl("Por implementar"),
            fechaInicio: new FormControl(formatDate(this._minDate, 'yyyy-MM-dd', 'en'), [
                Validators.required
            ]),
            fechaFin: new FormControl(formatDate(this._maxDate, "yyyy-MM-dd", "en"), [
                Validators.required
            ]),
            estado: new FormControl(EstadoHelper._sEstados[0].id),
            institucion: new FormControl([])
        }, { validator: dateLessThan("fechaInicio", "fechaFin") });
    }

    private setFormData() {
        //cargo id
        let tempId = this.activatedRoute.snapshot.paramMap.get("id");

        if (tempId.length == 0) {
            this._id = -1;
            this._isUpdateMode = false;
            console.log("creacion mode");
        }
        else {
            if (!isNaN(Number(tempId))) {
                //update mode
                console.log("update mode");

                this._isUpdateMode = true;
                this._id = +tempId;

                //aca codigo para obtener el curso mediante la api, por ahora en memoria
                let curso = this.cursosService.getCursosById2(this._id);

                console.dir(curso);

                this.nombre.setValue(curso.nombre);
                this.descripcion.setValue(curso.descripcion);
                this.estado.setValue(EstadoHelper.getEstadoId(curso.estado));
                this.fechaInicio.setValue(formatDate(curso.fechaInicio, 'yyyy-MM-dd', 'en'));
                this.fechaFin.setValue(formatDate(curso.fechaFin, 'yyyy-MM-dd', 'en'));
                //this.profesor.setValue(curso.idProfesor);
                this.institucion.setValue(curso.institucion.id);
            }
            else {
                //es un string o cualquier cosa
                console.log("es un string o cualquier cosa, por default creation mode");
                this._isUpdateMode = false;
                this._id = -1;
            }
        }
    }

    public ngOnInit(): void {
        //obtengo instituciones
        this.institucionService.getInstituciones().subscribe(
            instituciones => {
                this._instituciones = instituciones;

                if (this._instituciones.length > 0)
                    this.institucion.setValue(this._instituciones[0].id);

                this.setFormData();
            },
            error => {
                //enviarlo a home screen?
                this.setFormData();
                console.log(error);
            }
        );
    }

    public get estados() {
        return EstadoHelper._sEstados;
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

    //cou = create or update
    private cou() {
        console.log(this.fechaInicio.errors);
        console.log(this.fechaFin.errors);

        console.log("is this form valid: " + this._form.valid);

        if (!this._form.valid)
            return;

        this._usingService = true;

        this.institucionService.getInstitucionById(Number(this.institucion.value)).subscribe(
            institucionData => {
                let curso: ICurso = {
                    id: this._id == -1 ? 0 : this._id,
                    nombre: this.nombre.value,
                    descripcion: this.descripcion.value,
                    idProfesor: 0,//this.profesor.value,
                    fechaInicio: new Date(this.fechaInicio.value),
                    fechaFin: new Date(this.fechaFin.value),
                    estado: EstadoHelper.getEstadoName(this.estado.value),
                    institucion: institucionData,
                };

                if (this._isUpdateMode)
                    this.cursosService.putCursos2(curso);
                else
                    this.cursosService.postCursos2(curso);

                this._usingService = false;
            },
            error => {
                this._usingService = false;
                console.log(error);
            }
        );
    }

    public create() {
        this.cou();
    }

    public edit() {
        this.cou();
    }
}