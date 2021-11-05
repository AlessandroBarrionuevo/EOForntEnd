import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Institucion } from 'src/app/models/institucion';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { InstitucionService } from 'src/app/services/institucion.service';

@Component({
  selector: 'app-create-instituciones',
  templateUrl: './create-instituciones.component.html',
  styleUrls: ['./create-instituciones.component.css'],
})
export class CreateInstitucionesComponent implements OnInit {
  institucionForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    cuit: new FormControl('', [Validators.pattern("^(30|33)-([0-9]{8})-([0-9]{1}$)"), Validators.required]),
  });

  constructor(
    private institucionService: InstitucionService,
    private alert: AlertServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  crearInstitucion(inst: FormGroup) {
    let instACrear = new Institucion(
      inst.value.nombre,
      inst.value.direccion,
      inst.value.cuit
    );

    this.institucionService.crearInstitucion(instACrear).subscribe(
      (r) => {
        console.log(r);
        this.alert.animacionSucces('Institucion creada');
        this.router.navigate(['instituciones']);
      },
      (err) => {
        console.log(err);
        this.alert.toastError('Error');
      }
    );
  }
}
