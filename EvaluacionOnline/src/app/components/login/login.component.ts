import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
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
    ]),
    password: new FormControl('', Validators.required),
  });

  constructor(public autho: AuthService, private router: Router,
    private userService: UsersService, private msalService: MsalService) { }

  ngOnInit(): void {
   /* this.listaUsuarios = this.userService.listadoUsuarios();
    if (this.autho.isAuthenticated$) {
      this.router.navigate(['navbar']);  
    }*/

    if (this.isLoggedIn()) {
      console.log(this.isLoggedIn());
      
      this.router.navigate(['home', 1]);
    }
  }

  // Login(nickName: string) {
  //   this.usuario = this.userService.BuscarUsuarioEnListaPorLogin(nickName);

  //   if (!this.loginForm.invalid){ 
  //     if (this.usuario != null) {
  //       this.router.navigate(['home', this.usuario.id]);
  //     } else {
  //       console.log('err')
  //     }
  //   }
  // }

  // loginWithRedirect() {
  //   this.autho.loginWithRedirect();
    
  // }

  login() {
    this.msalService.loginPopup().subscribe(
      (r: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(r.account);
       }
    )
  }

  isLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount() != null;
  }

  logout() {
    this.msalService.logout();
  }
}
//Login(loginForm.value.nickName, loginForm.value.password)