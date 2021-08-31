import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  lista: Alumno[];
  cursos: Curso[];
  constructor(private alumnosService: AlumnosServiceService) {
    this.lista = this.alumnosService.obtenerListadoAlumnos();
  }

  ngOnInit(): void {
  }

  
}
