import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  listaUsuarios: Usuario[];

  loginForm: FormGroup = new FormGroup({
    nickName: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('', Validators.required),
  });

  constructor( private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.listaUsuarios = this.userService.listadoUsuarios();
  }

  Login(nickName: string, password: string) {
    this.usuario = this.userService.BuscarUsuarioEnLista(nickName, password);

    if (!this.loginForm.invalid){ 
      if (this.usuario != null) {
        this.router.navigate(['alumnos']);
      } else {
        console.log('err')
      }
    }

  }

  
}
