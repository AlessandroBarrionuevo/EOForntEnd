import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MsalService } from '@azure/msal-angular';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { HomeComponent } from '../components/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private router: Router, private loginService: SocialAuthService) { }

  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
    // if (this.msalService.instance.getActiveAccount() == null) {
    //   return false;
    // }
  
    if (localStorage.getItem("APP_TOKEN") != null) {
      
      return true;
    }
    
    this.router.navigate(['login'])  
    // if (this._authService.isUserAuthenticated()) {
    //   return true;
    // }

    return false;
  }
  
}
