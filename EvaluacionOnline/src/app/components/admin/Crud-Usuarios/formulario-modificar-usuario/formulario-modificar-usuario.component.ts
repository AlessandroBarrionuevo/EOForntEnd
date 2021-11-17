import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { usuarioBackOffice } from 'src/app/models/usuario';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { UsersService } from 'src/app/services/users.service';

import { Roles } from 'src/app/enums/Roles';

@Component({
  templateUrl: './formulario-modificar-usuario.component.html',
  styleUrls: ['../formulario-nuevo-usuario/formulario-nuevo-usuario.component.css'],
})
export class FormularioModificarUsuarioComponent implements OnInit {

  private _id: string;

  public _requestingApi: boolean;

  public _roles: string[] = [Roles.Alumno, Roles.Profesor, Roles.Admin];

  public modificarUsuario: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    rol: new FormControl(this._roles[0], Validators.required),
  });

  public constructor(
    private route: ActivatedRoute,
    private usuarioService: UsersService,
    private alert: AlertServiceService) {

    this._requestingApi = false;
  }

  public ngOnInit() {
    this._id = this.route.snapshot.params['id'];

    this._requestingApi = true;

    this.usuarioService.usuarioPorId(this._id).subscribe(
      data => {
        this.nombre.setValue(data.nombre);
        this.apellido.setValue(data.apellido);
        this.email.setValue(data.email);
        this.rol.setValue(data.rol);

        this._requestingApi = false;
      },
      error => {
        this.alert.toastError('No se encontro usuario con id: ' + this._id);
        this._requestingApi = false;
      }
    );
  }

  public get nombre() {
    return this.modificarUsuario.controls["nombre"];
  }

  public get apellido() {
    return this.modificarUsuario.controls["apellido"];
  }

  public get email() {
    return this.modificarUsuario.controls["email"];
  }

  public get rol() {
    return this.modificarUsuario.controls["rol"];
  }

  public modificarUser() {
    this._requestingApi = true;

    var usuario = {
      id: String(this._id),
      userName: String(this.email.value),
      nombre: String(this.nombre.value),
      apellido: String(this.apellido.value),
      dni: "",
      email: String(this.email.value),
      direccion: "",
      telefono: "",
      rol: String(this.rol.value),
    };

    this.usuarioService.editRol(usuario).subscribe(
      _ => {
        this._requestingApi = false;
      },
      error => {
        if (error.text != undefined)
          this.alert.toastError(error.text);
        else
          this.alert.toastError(error.error);

        this._requestingApi = false;
      }
    );


  }
}
