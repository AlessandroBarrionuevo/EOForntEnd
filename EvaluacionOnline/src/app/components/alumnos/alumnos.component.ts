import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { Usuario } from 'src/app/models/usuario';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
  
export class AlumnosComponent implements OnInit {
  lista: Alumno[];
  cursos: Curso[];
  id: number;
  usuario: Usuario;
  
  constructor(private alumnosService: AlumnosServiceService, private route: ActivatedRoute, private userService: UsersService, private router: Router) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.lista = this.alumnosService.obtenerListadoAlumnos();
    this.usuario = this.userService.BuscarUsuarioEnListaPorId(this.id);
  }

  modificar(matricula: number) {
    this.router.navigate(['alumno-form', matricula, this.usuario.id]);
  }
  
}
