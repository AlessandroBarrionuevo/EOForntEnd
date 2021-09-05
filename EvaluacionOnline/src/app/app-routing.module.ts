import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUpdateComponent } from './components/admin/form-update/form-update.component';
import { AlumnoDetailComponent } from './components/alumno-detail/alumno-detail.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  
  {
    path:'login', component: LoginComponent
  },
  {
    path:'home/:id', component: HomeComponent
  },
  {
    path:'alumnos/:id', component: AlumnosComponent
  },
  {
    path:'alumno-detail/:id/:idUsuario', component: AlumnoDetailComponent
  },
  {
    path:'alumno-form/:id/:idUsuario', component: FormUpdateComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
