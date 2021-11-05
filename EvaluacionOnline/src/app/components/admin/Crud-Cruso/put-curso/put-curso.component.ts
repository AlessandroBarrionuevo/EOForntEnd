import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-put-curso',
  templateUrl: './put-curso.component.html',
  styleUrls: ['./put-curso.component.css'],
})
export class PutCursoComponent implements OnInit {
  idCurso: number;
  curso: Curso;
  cursoForm: FormGroup = new FormGroup({
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
  ) {
    this.idCurso = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.obtenerCursoAModificar(this.idCurso);
  }

  obtenerCursoAModificar(id: number) {
    this.cursoService.obtenerCursoPorId(id).subscribe(
      (r) => {
        console.log(r);
        this.curso = r;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  modificar(datosCurso: FormGroup) {
    this.curso.nombre = datosCurso.value.nombre;
    this.curso.descripcion = datosCurso.value.descripcion;
    this.curso.fechaInicio = datosCurso.value.fechaInicio;
    this.curso.fechaFin = datosCurso.value.fechaFin;

    this.cursoService.modificarCurso(this.curso).subscribe(
      (r) => {
        this.alertService.animacionSucces('Curso modificado');
        this.router.navigate(['curso']);
        console.log(r);
      },
      (err) => {
        this.alertService.toastError('Error');
        console.log(err);
      }
    );
  }
}
