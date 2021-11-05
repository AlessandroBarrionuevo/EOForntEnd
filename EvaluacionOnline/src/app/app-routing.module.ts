import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearAlumnoComponent } from './components/admin/Crud-Alumnos/crear-alumno/crear-alumno.component';
import { FormUpdateComponent } from './components/admin/Crud-Alumnos/update-alumno/form-update.component';
import { AlumnoDetailComponent } from './components/admin/Crud-Alumnos/alumno-detail/alumno-detail.component';
import { AlumnosComponent } from './components/admin/Crud-Alumnos/alumnos/alumnos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GuardGuard } from './guards/guard.guard';

import { CursoComponent } from './components/admin/Crud-Cruso/curso/curso.component';
import { CreateCursoComponent } from './components/admin/Crud-Cruso/create-curso/create-curso.component';
import { PutCursoComponent } from './components/admin/Crud-Cruso/put-curso/put-curso.component';
import { TablaInstitucionesComponent } from './components/admin/Crud-Instituciones/Tabla-Instituciones/tabla-instituciones/tabla-instituciones.component';
import { CreateInstitucionesComponent } from './components/admin/Crud-Instituciones/Create-Instituciones/create-instituciones/create-instituciones.component';
import { PutInstitucionComponent } from './components/admin/Crud-Instituciones/Put-Institucion/put-institucion/put-institucion.component';
import { InstitucionComponent } from './components/admin/Gus/institucion/institucion.component';
import { InstitucionFormComponent } from './components/admin/Gus/form-institucion/form-institucion.component';
import { FormularioNuevoUsuarioComponent } from './components/admin/Usuarios/formulario-nuevo-usuario/formulario-nuevo-usuario.component';
import { CrearExamenComponent } from './components/profesor/Crud-Examenes/crear-examen/crear-examen.component';
import { ExamenesComponent } from './components/profesor/Crud-Examenes/examenes/examenes.component';
import { ActualizarExamenComponent } from './components/profesor/Crud-Examenes/actualizar-examen/actualizar-examen.component';
import { MenuProfesoresComponent } from './components/profesor/menu-profesores/menu-profesores.component';

const routes: Routes = [
  
  {
    path:'login', component: LoginComponent
  },
  {
    path:'home', component: HomeComponent
  },
  {
    path: 'alumnos/:id', component: AlumnosComponent//, canActivate: [GuardGuard]
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

  //Institucion
  {
    path: 'institucion/:id',
    component: InstitucionComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'institucion/:id', component: InstitucionFormComponent
  },
  
  //Cursos
  // {
  //   path: 'cursos', component: CursosComponent
  // },
  {
    path: 'curso', component: CursoComponent //, canActivate: [GuardGuard]
  },
  {
    path: 'crear-curso', component: CreateCursoComponent
  },
  {
    path: 'modificar-curso/:id', component: PutCursoComponent
  },
  // {
  //   path: 'cursos/:id', component: CursosFormComponent
  // },

  //Institucion
  {
    path: 'instituciones/:id', component: TablaInstitucionesComponent//, canActivate: [GuardGuard]
  },
  {
    path: 'crear-institucion', component: CreateInstitucionesComponent
  },
  {
    path: 'modificar-institucion/:id', component: PutInstitucionComponent
  },
  
  //Usuarios
  {
    path: 'admin/nuevo-usuario', component: FormularioNuevoUsuarioComponent
  },
  //examenes
  {
    path: 'examenes', component: ExamenesComponent
  },
  {
    path: 'crear-examen', component: CrearExamenComponent
  },
  {
    path: 'modificar-examen/:id', component: ActualizarExamenComponent
  },
  //meun
  {
    path: 'profesores', component: MenuProfesoresComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
