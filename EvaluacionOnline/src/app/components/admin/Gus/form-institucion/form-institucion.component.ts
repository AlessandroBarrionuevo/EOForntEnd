import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { InstitucionService } from 'src/app/services/institucion.service';
import { IInstitucion } from 'src/app/models/institucion';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    templateUrl: './form-institucion.component.html',
    styleUrls: ['./form-institucion.component.css']
})
export class InstitucionFormComponent implements OnInit {

    private _id: number;

    public _form: FormGroup;

    public _usingService: boolean;

    public static _sIsEditMode: boolean;

    public constructor(
        private formBuilder: FormBuilder,
        private service: InstitucionService,
        private activatedRoute: ActivatedRoute,
        private _snackBar: MatSnackBar) {

        this._id = -1;

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
                Validators.maxLength(11)
            ])
        });

    }

    private isValidCUIT(cuil: string): boolean {
        if (cuil.length !== 11) {
            return false;
        }

        const [checkDigit, ...rest] = cuil
            .split('')
            .map(Number)
            .reverse();

        const total = rest.reduce(
            (acc, cur, index) => acc + cur * (2 + (index % 6)),
            0,
        );

        const mod11 = 11 - (total % 11);

        if (mod11 === 11) {
            return checkDigit === 0;
        }

        if (mod11 === 10) {
            return false;
        }

        return checkDigit === mod11;
    }

    private openSnackBar(message: string, actionStr: string, durationMs: number) {
        this._snackBar.dismiss();
        this._snackBar.open(message, actionStr, {
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: durationMs
        });
    }

    public ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.service.getInstitucionById(params.id).subscribe(
                data => {
                    if (!isNaN(params.id)) {
                        InstitucionFormComponent._sIsEditMode = true;

                        this._id = data.id;

                        this.nombre.setValue(data.nombre);

                        this.direccion.setValue(data.direccion);

                        this.cuit.setValue(data.cuit);
                    }
                },
                error => {
                    console.error(error);
                }
            );
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

    public get isEditMode(): boolean {
        return InstitucionFormComponent._sIsEditMode;
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

        /*if (!this.isValidCUIT(this.cuit.value)) {
            console.log("cuit invalido");
            return;
        }*/

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