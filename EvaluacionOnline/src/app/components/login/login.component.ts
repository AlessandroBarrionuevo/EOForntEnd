import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ExternalAuthDto } from 'src/app/models/authDto';
import { Usuario } from 'src/app/models/usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  socialUser: SocialUser;
  isLoggedin: boolean;  

  loginForm: FormGroup = new FormGroup({
    nickName: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', Validators.required),
  });

  constructor(public autho: AuthService, private router: Router,
    private userService: UsersService, private _authService: AuthenticationService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
  

  }

  public externalLogin = () => {
    this._authService.signInWithGoogle()
    .then(res => {
      const user: SocialUser = { ...res };
      this.socialUser = user;
      console.log(user);
      const externalAuth: ExternalAuthDto = {
        provider: user.provider,
        idToken: user.idToken
      }

      this.validateExternalAuth(externalAuth);
      
      this.socialAuthService.authState.subscribe((user) => {
        console.dir("respuesta authState" )
        console.log(user);
        
        this.socialUser = user;
        if (this.socialUser != null) { 
          this.isLoggedin = true;
        }
      });
      
      this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then((res) => {
        console.log(res);
      });
    }, error => console.log(error))
  }

  logout() {
    this._authService.signOutExternal()
  }

  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this._authService.externalLogin( externalAuth)
      .subscribe(res => {
        localStorage.setItem("token", res.authToken);
      },
      error => {
        this._authService.signOutExternal();
      });
  }

  refreshUserToken() {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      console.log(res);
    });
  }
}
