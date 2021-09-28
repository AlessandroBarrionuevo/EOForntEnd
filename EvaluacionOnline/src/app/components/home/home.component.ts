import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExternalAuthDto } from 'src/app/models/authDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: any;
  socialUser: SocialUser;
  isLoggedin: boolean = false;  
  
  constructor(private route: ActivatedRoute, private user: UsersService, private router: Router, private _authService: AuthenticationService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem("APP_TOKEN") != null) { 
      this.isLoggedin = true;
      this.socialAuthService.authState.subscribe(
        (r) => { this.socialUser = r }
      )
    }
   
    console.log(this.socialUser);
  }

  irAAlumnos() {
    this.router.navigate(['alumnos', 1]);
  }

  externalLogin = () => {
    this._authService.signInWithGoogle()
    .then(res => {
      const user: SocialUser = { ...res };
      this.socialUser = user;
      localStorage.setItem("APP_TOKEN", res.idToken);
      console.log(localStorage.getItem("APP_TOKEN"));
      
      const externalAuth: ExternalAuthDto = {
        provider: user.provider,
        idToken: user.idToken
      }

      this.validateExternalAuth(externalAuth);

      
      
      this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID).then((res) => {
        //console.log(res);
      });
    }, error => console.log(error))
  }
  
  logout() {
    this.socialAuthService.signOut();
    this.socialUser = null;
    this.usuario = null;
    localStorage.clear();
  }

  private validateExternalAuth(externalAuth: ExternalAuthDto) {
    this._authService.externalLogin( externalAuth)
      .subscribe(res => {
       // console.log(res);
        this.usuario = res
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


