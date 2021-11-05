import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { InstitucionService } from 'src/app/services/institucion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-instituciones',
  templateUrl: './tabla-instituciones.component.html',
  styleUrls: ['./tabla-instituciones.component.css'],
})
export class TablaInstitucionesComponent implements OnInit {
  instituciones: any[];

  constructor(
    private institucionService: InstitucionService,
    private alertService: AlertServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerInstituciones();
  }

  obtenerInstituciones() {
    this.institucionService.obtenerIntituciones().subscribe(
      (r) => {
        this.instituciones = r;
        console.log(r);
        this.alertService.toastSucces('Lista cargada con exito');
      },
      (err) => {
        if (err.statusText == 'Unauthorized') {
          this.alertService.toastError(`No esta autorizado para realizar esta accion.`);
        } else { 
          this.alertService.toastError(`Error. Intente nuevamente.`);
        }
        console.log(err);
        
      }
    );
  }

  crearNuevaInstitucion() {
    this.router.navigate(['crear-institucion']);
  }

  modificarInstitucion(id: number) {
    this.router.navigate(['modificar-institucion', id]);
  }

  borrarInstitucion(id: number) {
    this.institucionService.borrarInstitucion(id).subscribe(
      (r) => {
        this.ngOnInit();
      },
      (err) => {
        this.alertService.toastError(
          `${err.error}`
        );
      }
    );
  }

  popUpBorrar(id: number, nombreInstituto: string) {

    Swal.fire({
      title: 'Cuidado!',
      text: 'El instituto sera eliminado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrarInstitucion(id);
        Swal.fire(
          'Eliminado correctamente!',
          `Se elimino el instituto ${nombreInstituto.toLocaleUpperCase()}`,
          'success'
        );
      }
    });
  }
}
