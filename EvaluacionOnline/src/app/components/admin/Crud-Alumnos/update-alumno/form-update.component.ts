import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumn } from 'src/app/models/alum';
import { Alumno } from 'src/app/models/alumno';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';

@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.css'],
})
export class FormUpdateComponent implements OnInit {
  usuarioId: number;
  idAlumnoAModificar: number;
  alumno: any;

  alumnoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),

    // direccion: new FormControl('', Validators.required),
    // mail: new FormControl('', Validators.required),
    // telefono: new FormControl('', Validators.required),
    // dni: new FormControl('', Validators.required),
    
  });

  constructor(
    private alumnosService: AlumnosServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertServiceService
  ) {
    this.idAlumnoAModificar = route.snapshot.params['id'];
    this.usuarioId = route.snapshot.params['idUsuario'];
  }

  ngOnInit(): void {
    this.alumno = this.alumnosService
      .obtenerAlumnoPorId(this.idAlumnoAModificar)
      .subscribe((r) => {
        (this.alumno = r), console.log(r);
      });
  }

  tomarDatosParaModificarAlumno(alumno: FormGroup, id: number) {
    let alumnoAUpdatear = new Alumn(alumno.value.nombre, alumno.value.apellido);
    alumnoAUpdatear.id = this.alumno.id;
    alumnoAUpdatear.email = this.alumno.email;
    alumnoAUpdatear.mail = this.alumno.mail;
    alumnoAUpdatear.userName = this.alumno.userName;
    alumnoAUpdatear.normalizedUserName = this.alumno.normalizedUserName;

    this.alumnosService.modificarAlumnoHttp(alumnoAUpdatear).subscribe((r) => {
      console.log(r);
      this.alert.animacionSucces('Alumno actualizado con exito');
      this.router.navigate(['alumnos', 1]);
    });
  }
}
