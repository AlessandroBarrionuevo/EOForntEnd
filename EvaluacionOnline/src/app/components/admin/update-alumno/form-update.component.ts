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
  alumno: any;

  alumnoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required)
  });

  constructor(private alumnosService: AlumnosServiceService, private route: ActivatedRoute, private router: Router) {
    this.idAlumnoAModificar = route.snapshot.params['id'];
    this.usuarioId = route.snapshot.params['idUsuario'];
  }

  ngOnInit(): void {
    this.alumno = this.alumnosService.obtenerAlumnoPorId(this.idAlumnoAModificar).subscribe(
      (r) => { this.alumno = r, console.log(r);
       }
    )
  }

  tomarDatosParaModificarAlumno(alumno: FormGroup, id: number) {
    let alumnoAUpdatear = new Alumno(
      alumno.value.nombre,
      alumno.value.apellido ,
      alumno.value.dni ,
      alumno.value.mail ,
      alumno.value.direccion,
      alumno.value.telefono
    )
    alumnoAUpdatear.id = this.alumno.id
    alumnoAUpdatear.dni = this.alumno.dni
    
    this.alumnosService.modificarAlumnoHttp(alumnoAUpdatear).subscribe(
      (r) => { console.log(r); }
    )
    
    //this.router.navigate(['alumnos', this.usuarioId]);
  }
}
