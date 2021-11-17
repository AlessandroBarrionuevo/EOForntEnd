import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { IPregunta } from 'src/app/models/IPregunta';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './actualizar-pregunta.component.html',
})
export class ActualizarPreguntaComponent implements OnInit {
    private _id: number;

    public preguntaModificar: FormGroup = new FormGroup({
        descripcion: new FormControl('', Validators.required),
        puntaje: new FormControl(1, [Validators.required, Validators.min(1)]),
    });

    public _requestingApi: boolean;

    constructor(
        private route: ActivatedRoute,
        private preguntaService: PreguntaService,
        private alertService: AlertServiceService) {
            this._requestingApi = false;
    }

    private fillCampos() {
        this.preguntaService.getPreguntaById((Number)(this.route.snapshot.params['id'])).subscribe(
            data => {
                this._id = data.id;
                this.descripcion.setValue(data.descripcion);
                this.puntaje.setValue(data.puntaje);
            },
            error => {
                console.log(error);
            }
        )
    }

    public ngOnInit() {
        this.fillCampos();
    }

    public get descripcion() {
        return this.preguntaModificar.controls["descripcion"];
    }

    public get puntaje() {
        return this.preguntaModificar.controls["puntaje"];
    }

    public get isInvalid() {
        return this.preguntaModificar.invalid;
    }

    public modificarPregunta() {
        this._requestingApi = true;
        
        interface PreguntaDTO {
            id: number;
            descripcion: string;
            puntaje: number;
        }

        var p: PreguntaDTO = {
            id: this._id,
            descripcion: this.descripcion.value,
            puntaje: this.puntaje.value
        };

        this.preguntaService.putPregunta(p).subscribe(
            data => {
                this.alertService.animacionSucces("Modificacion exitosa!");
                this._requestingApi = false;
            },
            error => {
                console.log(error);
                this._requestingApi = false;
            }
        );
    }
}