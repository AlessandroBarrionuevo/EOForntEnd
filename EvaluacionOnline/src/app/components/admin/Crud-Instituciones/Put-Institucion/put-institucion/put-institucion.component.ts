import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Institucion } from 'src/app/models/institucion';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { InstitucionService } from 'src/app/services/institucion.service';

@Component({
  selector: 'app-put-institucion',
  templateUrl: './put-institucion.component.html',
  styleUrls: ['./put-institucion.component.css'],
})
export class PutInstitucionComponent implements OnInit {
  
  idInstituto: number;
  institucion: Institucion;
  institucionForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    cuit: new FormControl('', [Validators.pattern("^(30|33)-([0-9]{8})-([0-9]{1}$)"), Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private institucionService: InstitucionService,
    private alert: AlertServiceService,
    private router: Router
  ) {
    this.idInstituto = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.datosInstitucion(this.idInstituto);
  }

  datosInstitucion(id: number) {
    this.institucionService.obtenerIntitucionPorId(id).subscribe(
      (r) => {
        this.institucion = r;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  modificarInstitucion(datos: FormGroup) {
    this.institucion.nombre = datos.value.nombre;
    this.institucion.direccion = datos.value.direccion;
    this.institucion.cuit = datos.value.cuit;

    this.institucionService.modificarInstitucion(this.institucion).subscribe(
      (r) => {
        console.log(r);
        this.alert.toastSucces('Modificado con exito');
        this.router.navigate(['instituciones']);
      },
      (err) => {
        this.alert.toastError('Error');
        console.log(err);
      }
    );
  }
}
