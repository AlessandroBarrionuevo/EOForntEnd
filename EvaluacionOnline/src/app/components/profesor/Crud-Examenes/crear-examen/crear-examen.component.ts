import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Examen } from 'src/app/models/examen';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { ExamenesService } from 'src/app/services/examenes.service';

@Component({
  selector: 'app-crear-examen',
  templateUrl: './crear-examen.component.html',
  styleUrls: ['./crear-examen.component.css']
})
export class CrearExamenComponent implements OnInit {
  examen: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    fecha: new FormControl('',  Validators.required),
    duracion: new FormControl('', Validators.required),
    curso: new FormControl('', Validators.required)
  });
  
  constructor(
    private examenService: ExamenesService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertServiceService) { }

  ngOnInit(): void {
  }

  crearExamen(examen: FormGroup) { 
    let examenACrear: Examen = new Examen(
      examen.value.nombre,
      examen.value.estado,
      examen.value.fecha,
      examen.value.duracion,
      examen.value.curso
    )
    console.log(examenACrear);

    this.examenService.crearExamen(examenACrear).subscribe(
      (r) => { console.log(r);
      },
      (err) => {console.log(err);
       }
    )
  }


}
