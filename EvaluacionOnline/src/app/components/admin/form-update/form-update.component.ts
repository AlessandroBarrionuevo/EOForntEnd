import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css']
})
export class FormUpdateComponent implements OnInit {
  usuarioId: number;
  idAlumnoAModificar: number;
  alumnoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required)
  });

  constructor(private alumnosService: AlumnosServiceService, private route: ActivatedRoute, private router: Router) {
    this.idAlumnoAModificar = route.snapshot.params['id'];
    this.usuarioId = route.snapshot.params['idUsuario'];
  }

  ngOnInit(): void {

  }

  tomarDatosParaModificarAlumno() {
    let alumno = this.alumnosService.buscarAlumnoEnListaPorId(this.idAlumnoAModificar);
    alumno.nombre = this.alumnoForm.value.nombre;
    alumno.apellido = this.alumnoForm.value.apellido;
    alumno.direccion = this.alumnoForm.value.direccion;
    alumno.mail = this.alumnoForm.value.mail;
    alumno.telefono = this.alumnoForm.value.telefono;

    this.alumnosService.modificarAlumno(alumno);
    console.log(alumno);
    
    this.router.navigate(['alumnos', this.usuarioId]);

  }
}
