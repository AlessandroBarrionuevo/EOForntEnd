import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { Usuario } from 'src/app/models/usuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: Usuario;
  datos: string = null;
  
  constructor(private route: ActivatedRoute, public auth: MsalService,
    private user: UsersService, private msalService: MsalService,
    private router: Router) { }//this.id = route.snapshot.params['id']; }

  ngOnInit(): void {
    let a = this.auth.instance.getActiveAccount();

    console.log(a);
    
  }

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

  irAAlumnos() {
    this.router.navigate(['alumnos', 1]);
  }

}


