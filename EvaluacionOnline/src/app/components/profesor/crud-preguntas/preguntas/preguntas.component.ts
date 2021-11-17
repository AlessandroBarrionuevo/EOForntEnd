import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Examen } from 'src/app/models/examen';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { ExamenesService } from 'src/app/services/examenes.service';
import { IPregunta } from 'src/app/models/IPregunta';
import { AlertServiceService } from 'src/app/services/alert-service.service';

@Component({
  templateUrl: './preguntas.component.html',
})
export class PreguntasComponent implements OnInit {

  public _preguntas: { id: number, descripcion: string, puntaje: number, examen: Examen }[] = [];

  constructor(
    private examenService: ExamenesService,
    private preguntasService: PreguntaService,
    private alertService: AlertServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerPreguntas();
  }

  obtenerPreguntas() {
    //no tengo get all asi que toca asi....
    for (let i = 0; i < 30; ++i) {
      this.preguntasService.getPreguntaById(i).subscribe(
        data => {
          //console.dir(data);

          var obj: { id: number, descripcion: string, puntaje: number, examen: Examen } = {
            id: data.id,
            descripcion: data.descripcion,
            puntaje: data.puntaje,
            examen: null,
          };
          this._preguntas.push(obj);
          
          /*
          //no esta devolviendo el id del examen al que referencia esta pregunta
          this.examenService.obtenerUnExamen(data.examenId).subscribe(
            data2 => {
              obj.examen = data2;

              this._preguntas.push(obj);
            })*/
        },
        error =>{
          console.log(error);
        }
      )
    }
  }

  crearPregunta() {
    this.router.navigate(['crear-pregunta']);
  }

  borrar(id: number) {
    this.preguntasService.getPreguntaById(id).subscribe(
      data =>{
        this.preguntasService.deletePregunta(id).subscribe(
          _ =>{
            let index = this._preguntas.findIndex(x => x.id == data.id);
            if(index != -1)
              this._preguntas.splice(index, 1);
          },
          error=>{
            this.alertService.toastError("No se puede eliminar porque este examen ya fue evaluado");
          }
        )
      },
      error =>{
        this.alertService.toastError(error.error);
      }
    );
  }

  modificar(id: number) {
    this.router.navigate(['modificar-pregunta', id]);
  }
}