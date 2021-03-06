import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Usuario } from 'src/app/models/usuario';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-alumno-detail',
  templateUrl: './alumno-detail.component.html',
  styleUrls: ['./alumno-detail.component.css'],
})
export class AlumnoDetailComponent implements OnInit {
  id: number;
  alumno: any;
  usuarioId: number;
  usuario: Usuario;
  
  constructor(
    private alumnosService: AlumnosServiceService,
    private route: ActivatedRoute,
    private usuarioService: UsersService,
    private alert: AlertServiceService
  ) {
    this.id = route.snapshot.params['id'];
    this.usuarioId = route.snapshot.params['idUsuario'];
  }

  ngOnInit(): void {
    this.alumno = this.alumnosService.obtenerAlumnoPorId(this.id).subscribe(
      (r) => {
        this.alumno = r;
      },
      (err) => {
        this.alert.toastError('Error al obtener los datos del alumno');
      }
    );
    this.usuario = this.usuarioService.BuscarUsuarioEnListaPorId(
      this.usuarioId
    );
  }
}
