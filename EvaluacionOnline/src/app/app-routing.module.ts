import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAlumnoComponent } from './components/admin/crear-alumno/crear-alumno.component';
import { FormUpdateComponent } from './components/admin/update-alumno/form-update.component';
import { AlumnoDetailComponent } from './components/alumno-detail/alumno-detail.component';
import { AlumnosComponent } from './components/admin/alumnos/alumnos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  
  {
    path:'login', component: LoginComponent
  },
  {
    path:'home', component: HomeComponent
  },
  {
    path: 'alumnos/:id', component: AlumnosComponent, canActivate: [GuardGuard]
  },
  {
    path:'alumno-detail/:id/:idUsuario', component: AlumnoDetailComponent//, canActivate: [GuardGuard]
  },
  {
    path:'alumno-form/:id/:idUsuario', component: FormUpdateComponent//, canActivate: [GuardGuard]
  },
  {
    path:'logout', component: LogoutComponent
  },
  {
    path:'navbar', component: NavbarComponent//, canActivate: [GuardGuard]
  },
  {
    path:'crear-alumno', component: CrearAlumnoComponent//, canActivate: [GuardGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
