import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { InstitucionService } from 'src/app/services/institucion.service';
import { IInstitucion } from 'src/app/models/institucion';

import { MatSnackBar } from '@angular/material/snack-bar';

import { cuitValidator } from 'src/app/validators/cuitValidators';

@Component({
    templateUrl: './form-institucion.component.html',
    styleUrls: ['./form-institucion.component.css']
})
export class InstitucionFormComponent implements OnInit {

    private _id: number;

    public _form: FormGroup;

    public _usingService: boolean;

    public _isUpdateMode: boolean;

    public constructor(
        private formBuilder: FormBuilder,
        private service: InstitucionService,
        private activatedRoute: ActivatedRoute,
        private _snackBar: MatSnackBar) {

        this._form = this.formBuilder.group({
            nombre: [
                "",
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(16)
                ]
            ],
            direccion: [
                "",
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(32)
                ]
            ],
            cuit: new FormControl("", [
                Validators.required,
                Validators.maxLength(11),
                cuitValidator
            ])
        });

    }

    public ngOnInit(): void {
        let tempId = this.activatedRoute.snapshot.paramMap.get("id");

        if (tempId.length == 0) {
            this._id = -1;
            this._isUpdateMode = false;
            console.log("creacion mode on");
        }
        else {
            if (!isNaN(Number(tempId))) {
                this._isUpdateMode = true;
                this._id = +tempId;

                this.service.getInstitucionById(this._id).subscribe(
                    data => {
                        this.nombre.setValue(data.nombre);

                        this.direccion.setValue(data.direccion);

                        this.cuit.setValue(data.cuit);
                    },
                    error => {
                        console.error(error);
                    }
                );
                console.log("es numero edit mode on");
            }
            else {
                //es un string o cualquier cosa
                console.log("es un string o cualquier cosa, creation mode on");
                this._isUpdateMode = false;
                this._id = -1;
            }
        }
    }
    
    private openSnackBar(message: string, actionStr: string, durationMs: number) {
        this._snackBar.dismiss();
        this._snackBar.open(message, actionStr, {
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: durationMs
        });
    }

    //devuelve institucion a crear o modificar
    private getInstitucion(): IInstitucion {
        let institucion: IInstitucion = {
            id: this._id == -1 ? 0 : this._id,
            nombre: this.nombre.value,
            direccion: this.direccion.value,
            cuit: this.cuit.value
        };

        return institucion;
    }

    public get nombre() {
        return this._form.get("nombre");
    }

    public get direccion() {
        return this._form.get("direccion");
    }

    public get cuit() {
        return this._form.get("cuit");
    }

    //crear una institucion
    public create() {
        if (!this._form.valid)
            return;
            
        this._usingService = true;

        this.service.postInstitucion(this.getInstitucion()).subscribe(
            data => {
                console.log(data);

                this._usingService = false;

                this.openSnackBar("Institucion creada con exito", "", 1000);
            },
            error => {
                console.error(error);

                this._usingService = false;

                this.openSnackBar(error, "", 2000);
            }
        );
    }

    //edita una institucion
    public edit() {
        if (!this._form.valid)
            return;

        this._usingService = true;

        this.service.putInstitucion(this.getInstitucion()).subscribe(
            data => {
                console.log(data);

                this._usingService = false;

                this.openSnackBar("Institucion modificada con exito", "", 1000);
            },
            error => {
                console.error(error);

                this._usingService = false;
            }
        );
    }
}