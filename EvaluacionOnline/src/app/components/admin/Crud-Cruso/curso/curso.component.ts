import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { CursosService } from 'src/app/services/cursos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent implements OnInit {
  cursos: any[];
  alertService: any;

  constructor(
    private cursoService: CursosService,
    private router: Router,
    private alert: AlertServiceService
  ) {}

  ngOnInit(): void {
    this.obtenerCursos();
  }

  obtenerCursos() {
    this.cursoService.obtenerTodosLosCursos().subscribe(
      (r) => {
        this.cursos = r;
        console.log(r);
      },
      (err) => {
        this.alert.toastError('Error, no se pudo completar la solicitud');
        console.error(err);
      }
    );
  }

  modificarCurso(id: number) {
    this.router.navigate(['modificar-curso', id]);
  }

  borrarCurso(id: number) {
    this.cursoService.borrarCurso(id).subscribe(
      (r) => {
        this.ngOnInit();
      },
      (err) => {
        this.alert.toastError('Error, no se pudo completar la solicitud');
      }
    );
  }

  crearCurso() {
    this.router.navigate(['crear-curso']);
  }

  popUpBorrar(id: number, nombreCurso: string) {
    Swal.fire({
      title: 'Cuidado!',
      text: 'El curso seleccionado sera eliminado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarCurso(id);
        Swal.fire('Eliminado!', `${nombreCurso} se elimino correctamente`, 'success');
      }
    });
  }
}
