import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Examen } from 'src/app/models/examen';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ExamenesService } from 'src/app/services/examenes.service';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css'],
})
export class ActualizarExamenComponent implements OnInit {
  idExamen: number;
  examen: Examen;

  examenForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    duracion: new FormControl('', Validators.required),
    curso: new FormControl('', Validators.required),
  });
  constructor(
    private route: ActivatedRoute,
    private examenService: ExamenesService,
    private router: Router,
    private alertService: AlertServiceService
  ) {
    this.idExamen = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.examenAModificar(this.idExamen);
  }

  examenAModificar(id: number) {
    this.examenService.obtenerUnExamen(id).subscribe(
      (r) => {
        this.examen = r;
        console.log(r);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  modificarExamen(examen: FormGroup) {
    this.examen.nombre = examen.value.nombre;
    this.examen.estado = examen.value.estado;
    this.examen.fecha = examen.value.fecha;
    this.examen.duracion = examen.value.duracion;
    this.examen.curso = examen.value.curso;
    this.examenService.modificarExamenHttp(this.examen).subscribe(
      (r) => { 
        this.alertService.animacionSucces('Examen modificado');
        this.router.navigate(['examenes']);
        console.log(r);
       },
      (err) => {
        this.alertService.toastError('Error');
        console.log(err);
      }
    )
  }

}
