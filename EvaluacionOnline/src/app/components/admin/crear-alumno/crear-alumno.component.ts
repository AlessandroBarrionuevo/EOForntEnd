import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent implements OnInit {

  crearAlumnoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required)
  });
  
  constructor(private alumnoService: AlumnosServiceService, private router:Router, private alert: AlertServiceService) { }

  ngOnInit(): void {
  }

  crearAlumno(alumno: FormGroup) {
    let alumnoACrear = new Alumno(
      alumno.value.nombre, alumno.value.apellido,
      alumno.value.dni, alumno.value.mail,
      alumno.value.direccion, alumno.value.telefono
    )

    alumnoACrear.token = "asdasdasdasdasdasdasdasdasd123"
    this.alumnoService.crearAlumno(alumnoACrear).subscribe(
      (r) => { if (r != null) { console.log(r);
       this.alert.animacion('Su alumno se a creado correctamente'), this.router.navigate(['alumnos', 1]);} }
    )

  }

}
