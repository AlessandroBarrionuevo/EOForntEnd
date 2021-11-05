import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { ICurso } from 'src/app/models/curso';
import { Usuario } from 'src/app/models/usuario';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { AlumnosServiceService } from 'src/app/services/alumnos-service.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
  
export class AlumnosComponent implements OnInit {
  lista: any[];
  cursos: ICurso[];
  id: number;
  usuario: Usuario;
  respuesta: any;
  
  constructor(private alumnosService: AlumnosServiceService, private route: ActivatedRoute,
    private userService: UsersService, private router: Router,
    private alert: AlertServiceService) {
    this.id = route.snapshot.params['id'];
  }

  ngOnInit(): void {
   // this.lista = this.alumnosService.obtenerListadoAlumnos();
    this.alert.toastWarning('Esta seccion maneja datos sensibles')
    this.usuario = this.userService.BuscarUsuarioEnListaPorId(this.id);
    this.listadoAlumnos();
  }

  modificar(id: number) {
    this.router.navigate(['alumno-form', id, 1]);
  }

  listadoAlumnos() {
    this.alumnosService.listadoAlumnos().subscribe(
      (r) => { this.lista = r; console.dir(r) },
      (err) => {
        if (err != null) {
          this.alert.toastError('Error, por favor intente nuevamente.');
        }
      }
    );
  }

  crearUnAlumno() {
    this.router.navigate(['crear-alumno']);
  }

  borrarAlumno(id: number) {
    this.alumnosService.borrarAlumno(id).subscribe(
      (r) => { this.ngOnInit() },
      (err) => {
        if (err != null) {
          this.alert.toastError(err);
        }
      }
    )
  }

  popUpBorrar(id: number, nombreAlumno: string) {
    Swal.fire({
      title: 'Cuidado!',
      text: "Esta por eliminar un alumno, esta accion no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarAlumno(id);      
        Swal.fire(
          'Eliminado!',
          `${nombreAlumno} se elimino correctamente.`,
          'success'
        )
      }
    })
  }
  


  
}
