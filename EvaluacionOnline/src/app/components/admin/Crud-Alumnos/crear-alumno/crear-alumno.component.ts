import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css'],
})
export class CrearAlumnoComponent implements OnInit {
  crearAlumnoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    userName: new FormControl('', Validators.required),
  });

  constructor(
    private alumnoService: AlumnosServiceService,
    private router: Router,
    private alert: AlertServiceService
  ) {}

  ngOnInit(): void {}

  crearAlumno(alumno: FormGroup) {
    let alumnoACrear = new Alumno(
      alumno.value.userName,
      alumno.value.mail,
      alumno.value.nombre,
      alumno.value.apellido
    );

    this.alumnoService.crearAlumno(alumnoACrear).subscribe((r) => {
      if (r != null) {
        console.log(r);
        this.alert.animacionSucces('Su alumno se a creado correctamente'),
        this.router.navigate(['alumnos', 1]);
      }
    });
  }
}
