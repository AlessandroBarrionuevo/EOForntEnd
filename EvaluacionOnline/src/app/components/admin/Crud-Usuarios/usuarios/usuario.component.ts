import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { usuarioBackOffice } from 'src/app/models/usuario';
import { AlertServiceService } from 'src/app/services/alert-service.service';
import { UsersService } from 'src/app/services/users.service';

import { Roles } from 'src/app/enums/Roles';
import * as _ from 'angular-material';

@Component({
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {

    public _usuarios: any[];

    public _requestingApi: boolean;

    constructor(
        private userService: UsersService,
        private alertService: AlertServiceService,
        private router: Router){

        this._requestingApi = false;
    }

    ngOnInit(){
        this.getUsuarios();
    }

    private getUsuarios(){
        this._requestingApi = true;

        this.userService.getUsuarios().subscribe(
            data =>{
                this._usuarios = data;
                console.dir(data);
                this._requestingApi = false;
            },
            _ =>{
                this.alertService.toastError("Error al obtener todos los usuarios");
                this._requestingApi = false;
            }
        );
    }

    public eliminarUsuario(id: string){
        this._requestingApi = true;

        this.userService.delete(id).subscribe(
            _ =>{
                this.alertService.animacionSucces("Usuario eliminado!");
                this.getUsuarios();
            },
            _ =>{
                this.alertService.toastError("No se pudo eliminar este Usuario");
                this._requestingApi = false;
            }
        )
    }

    public modificarUsuario(id: string){
        this.router.navigate(["/admin/modificar-usuario/" + id]);
    }

    public crearUsuario(){
        this.router.navigate(['/admin/nuevo-usuario']);
    }

}
