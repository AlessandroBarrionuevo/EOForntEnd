import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-create-curso',
  templateUrl: './create-curso.component.html',
  styleUrls: ['./create-curso.component.css'],
})
export class CreateCursoComponent implements OnInit {
  crearCursoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fechaInicio: new FormControl('', Validators.required),
    fechaFin: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursosService,
    private router: Router,
    private alertService: AlertServiceService
  ) {}

  ngOnInit(): void {}

  crearCurso(curso: FormGroup) {
    
    let nuevoCurso = new Curso(
      curso.value.nombre,
      curso.value.descripcion,
      curso.value.fechaInicio,
      curso.value.fechaFin
    );

    this.cursoService.crearCurso(nuevoCurso).subscribe(
      (r) => {
        this.alertService.toastSucces('Curso creado con exito');
        this.router.navigate(['curso']);
        console.log(r);
      },
      (err) => {
        this.alertService.toastError('Error, no se pudo completar la solicitud');
        console.log(err);
      }
    );
  }
}
