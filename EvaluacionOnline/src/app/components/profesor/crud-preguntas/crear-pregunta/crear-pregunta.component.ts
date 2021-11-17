import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoPregunta } from 'src/app/enums/TipoPregunta';
import { Examen } from 'src/app/models/examen';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ExamenesService } from 'src/app/services/examenes.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { IPregunta } from 'src/app/models/IPregunta';

@Component({
    templateUrl: './crear-pregunta.component.html',
})
export class CrearPreguntaComponent implements OnInit {
    public pregunta: FormGroup = new FormGroup({
        descripcion: new FormControl('', Validators.required),
        puntaje: new FormControl(1, [Validators.required, Validators.min(1)]),
        //valor: new FormControl(1, [Validators.required, Validators.min(1)]),
        //discriminador: new FormControl('', Validators.required),
        examen: new FormControl('', Validators.required),
        //preguntaChoice: new FormControl('', Validators.required),
        //esRespuesta : new FormControl(false)
    });

    public _examenes: Examen[];

    public _requestingApi: boolean;

    public _tipoPreguntas: TipoPregunta[] = [
        TipoPregunta.Desarrollar,
        TipoPregunta.MultipleChoiceUnaRespuesta,
        TipoPregunta.MultipleChoiceVariasRespuesta
    ];

    public _multipleChoiceUnaRespuesta: { respuesta: string, esRespuesta: boolean }[] = [
        { respuesta: "Respuesta1", esRespuesta: false },
        { respuesta: "Respuesta2", esRespuesta: true },
        { respuesta: "Respuesta3", esRespuesta: false },
    ];

    public _multipleChoiceVariasRespuesta: { respuesta: string, esRespuesta: boolean }[] = [
        { respuesta: "Respuesta1", esRespuesta: true },
        { respuesta: "Respuesta2", esRespuesta: false },
        { respuesta: "Respuesta3", esRespuesta: false },
        { respuesta: "Respuesta4", esRespuesta: true },
        { respuesta: "Respuesta5", esRespuesta: false },
        { respuesta: "Respuesta6", esRespuesta: false },
        { respuesta: "Respuesta7", esRespuesta: true },
    ];

    constructor(
        private examenesService: ExamenesService,
        private preguntaService: PreguntaService,
        private alertService: AlertServiceService) { 
        
        this._requestingApi = false;
    }


    private getExamenes() {
        this.examenesService.listadoExamenes().subscribe(
            data => {
                this._examenes = data;

                if (this._examenes.length > 0)
                    this.examen.setValue(this._examenes[0].id);
            },
            error => {
                console.log(error);
            }
        );
    }

    //al seleccionar un item multiple choice con UNA sola respuesta
    public onClickMultipleChoiceUnaRespuestaItem(i: number) {
        for (let index = 0; index < this._multipleChoiceUnaRespuesta.length; ++index)
            this._multipleChoiceUnaRespuesta[index].esRespuesta = false;

        this._multipleChoiceUnaRespuesta[i].esRespuesta = !this._multipleChoiceUnaRespuesta[i].esRespuesta;
    }

    //al eliminar un item multiple choice con UNA sola respuesta
    public onDeleteMultipleChoiceUnaRespuestaItem(i: number) {
        this._multipleChoiceUnaRespuesta.splice(i, 1);
    }

    //al seleccionar un item multiple choice con VARIAS respuestas
    public onClickMultipleChoiceVariasRespuestaItem(i: number) {
        this._multipleChoiceVariasRespuesta[i].esRespuesta = !this._multipleChoiceVariasRespuesta[i].esRespuesta;

        var filtered = this._multipleChoiceVariasRespuesta.filter(x => x.esRespuesta);

        //en el caso que seleccione todas las respuestas como correctas, la actual la seteo como false
        if (filtered.length === this._multipleChoiceVariasRespuesta.length)
            this._multipleChoiceVariasRespuesta[i].esRespuesta = false;
    }

    //al eliminar un item multiple choice con VARIAS respuestas
    public onDeleteMultipleChoiceVariasRespuestaItem(i: number) {
        this._multipleChoiceVariasRespuesta.splice(i, 1);
    }

    public ngOnInit() {
        //this.discriminador.setValue(this._tipoPreguntas[0]);

        this.getExamenes();
    }

    public get descripcion() {
        return this.pregunta.controls["descripcion"];
    }

    public get puntaje() {
        return this.pregunta.controls["puntaje"];
    }

    public get valor() {
        return this.pregunta.controls["valor"];
    }

    public get discriminador() {
        return this.pregunta.controls["discriminador"];
    }

    public get examen() {
        return this.pregunta.controls["examen"];
    }

    public get preguntaChoice() {
        return this.pregunta.controls["preguntaChoice"]
    }

    public get esRespuesta() {
        return this.pregunta.controls["esRespuesta"];
    }

    public get desarrollar() {
        return TipoPregunta.Desarrollar;
    }

    public get multipleChoiceUnaRespuesta() {
        return TipoPregunta.MultipleChoiceUnaRespuesta;
    }

    public get multipleChoiceVariasRespuesta() {
        return TipoPregunta.MultipleChoiceVariasRespuesta;
    }

    public agregarRespuesta() {
        if (this.discriminador.value == this.multipleChoiceUnaRespuesta) {
            if (this.esRespuesta.value == true) {
                for (let i = 0; i < this._multipleChoiceUnaRespuesta.length; ++i)
                    this._multipleChoiceUnaRespuesta[i].esRespuesta = false;
            }

            this._multipleChoiceUnaRespuesta.push({ respuesta: this.preguntaChoice.value, esRespuesta: this.esRespuesta.value });
        }
        else if (this.discriminador.value == this.multipleChoiceVariasRespuesta) {
            this._multipleChoiceVariasRespuesta.push({ respuesta: this.preguntaChoice.value, esRespuesta: this.esRespuesta.value });
        }

        this.esRespuesta.setValue(false);
    }

    public get isInvalid() {
        return this.pregunta.invalid;
    }

    public crearPregunta() {
        this._requestingApi = true;

        let ex = this._examenes.filter(x => x.id == +this.examen.value);

        if (ex.length > 0) {
            var p: IPregunta = {
                id: 0,
                descripcion: this.descripcion.value,
                puntaje: +this.puntaje.value,
                valor: 0,
                examenId: ex[0].id
            };

            this.preguntaService.postPregunta(p).subscribe(
                data => {
                    this.alertService.toastSucces("Pregunta creada!");
                    this._requestingApi = false;
                },
                error => {
                    console.log(error);
                    this._requestingApi = false;
                }
            );
        }
    }
}