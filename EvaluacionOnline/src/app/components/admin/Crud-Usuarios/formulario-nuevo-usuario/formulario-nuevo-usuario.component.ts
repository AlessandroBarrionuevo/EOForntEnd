import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { usuarioBackOffice } from 'src/app/models/usuario';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-formulario-nuevo-usuario',
  templateUrl: './formulario-nuevo-usuario.component.html',
  styleUrls: ['./formulario-nuevo-usuario.component.css'],
})
export class FormularioNuevoUsuarioComponent implements OnInit {
  nuevoUsuario: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
  });

  roles:string[]=["Alumno","Profesor","Admin"];
  seleccionado: string;
  
  constructor(
    private usuarioService: UsersService,
    private router: Router,
    private alert: AlertServiceService
  ) {}

  ngOnInit(): void {}

  crearUsuario(nuevoUsuario: FormGroup) {
    let usuario = new usuarioBackOffice(
      nuevoUsuario.value.email,
      nuevoUsuario.value.nombre,
      nuevoUsuario.value.apellido,
      nuevoUsuario.value.email,
      nuevoUsuario.value.rol
    );
    
    console.dir(usuario);
    
    this.usuarioService.registrarUsuario(usuario).subscribe(
      (r) => {
        console.log(r);
        this.alert.toastSucces('Operacion realizada con exito')
        this.router.navigate['/Home'];
      },
      (err) => {
        console.log(err);
        this.alert.toastError('Error al realizar la accion.')
      }
    );
  }
}
