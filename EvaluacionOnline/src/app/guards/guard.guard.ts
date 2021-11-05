import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { HomeComponent } from '../components/home/home.component';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'any',
})
export class GuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: SocialAuthService,
    private user: UsersService,
    private activatedRoute: ActivatedRoute
  ) { }
  
  rol: string;
  asd: string = 'sad';
 
  // usuariobyID(usuario: any) {
  //   this.user.usuarioPorId(usuario).subscribe(
  //     (r) => {
  //       this.rol = r.rol;
  //       console.log(this.rol);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    
    return this.usuariobyID(localStorage.getItem('ID'))

    // if (!this.user.usuariobyID(localStorage.getItem('ID'))) {
    //   console.log('err');
    //   console.log(this.user.usuariobyID(localStorage.getItem('ID')));
    //   console.log(localStorage.getItem('ID'));
    //   this.router.navigate(['login']);
    //   return false;
    // } else {
    //   console.log(localStorage.getItem('ID'));
    //   console.log('paso');
    //   return true;
    // }
  }

  usuariobyID(usuario: any): boolean {
    let bool = false
    this.user.usuarioPorId(usuario).subscribe(
      (r) => {
        if (r.rol == 'Admin') { 
          console.log('paso');
          bool = true
          return bool;
        }
      },
      (err) => {
        return bool;
      }
    );

    return bool
  }

  //hay algo con el scope que me esta tirando undefined
}
