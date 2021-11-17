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
<<<<<<< Updated upstream
import { InstitucionComponent } from './components/admin/institucion/institucion.component';
import { InstitucionFormComponent } from './components/admin/form-institucion/form-institucion.component';
import { CursosComponent } from './components/admin/cursos/cursos.component';
import { CursosFormComponent } from './components/admin/form-cursos/form-cursos.component';
=======

import { CursoComponent } from './components/admin/Crud-Cruso/curso/curso.component';
import { CreateCursoComponent } from './components/admin/Crud-Cruso/create-curso/create-curso.component';
import { PutCursoComponent } from './components/admin/Crud-Cruso/put-curso/put-curso.component';
import { TablaInstitucionesComponent } from './components/admin/Crud-Instituciones/Tabla-Instituciones/tabla-instituciones/tabla-instituciones.component';
import { CreateInstitucionesComponent } from './components/admin/Crud-Instituciones/Create-Instituciones/create-instituciones/create-instituciones.component';
import { PutInstitucionComponent } from './components/admin/Crud-Instituciones/Put-Institucion/put-institucion/put-institucion.component';
import { FormularioNuevoUsuarioComponent } from './components/admin/Crud-Usuarios/formulario-nuevo-usuario/formulario-nuevo-usuario.component';
import { CrearExamenComponent } from './components/profesor/Crud-Examenes/crear-examen/crear-examen.component';
import { ExamenesComponent } from './components/profesor/Crud-Examenes/examenes/examenes.component';
import { ActualizarExamenComponent } from './components/profesor/Crud-Examenes/actualizar-examen/actualizar-examen.component';
import { MenuProfesoresComponent } from './components/profesor/menu-profesores/menu-profesores.component';
import { PreguntasComponent } from './components/profesor/crud-preguntas/preguntas/preguntas.component';
import { CrearPreguntaComponent } from './components/profesor/crud-preguntas/crear-pregunta/crear-pregunta.component';
import { ActualizarPreguntaComponent } from './components/profesor/crud-preguntas/actualizar-pregunta/actualizar-pregunta.component';
import { FormularioModificarUsuarioComponent } from './components/admin/Crud-Usuarios/formulario-modificar-usuario/formulario-modificar-usuario.component';
import { UsuarioComponent } from './components/admin/Crud-Usuarios/usuarios/usuario.component';
>>>>>>> Stashed changes

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
    path:'alumno-detail/:id/:idUsuario', component: AlumnoDetailComponent, canActivate: [GuardGuard]
  },
  {
    path:'alumno-form/:id/:idUsuario', component: FormUpdateComponent, canActivate: [GuardGuard]
  },
  {
    path:'logout', component: LogoutComponent
  },
<<<<<<< Updated upstream
  {
    path:'navbar', component: NavbarComponent, canActivate: [GuardGuard]
  },
=======
  
>>>>>>> Stashed changes
  {
    path:'crear-alumno', component: CrearAlumnoComponent, canActivate: [GuardGuard]
  },

<<<<<<< Updated upstream
  //Institucion
  {
    path: 'institucion', component: InstitucionComponent
  },
  {
    path: 'institucion/:id', component: InstitucionFormComponent
  },
  
  //Cursos
=======
  {
    path: 'curso', component: CursoComponent //, canActivate: [GuardGuard]
  },
  {
    path: 'crear-curso', component: CreateCursoComponent
  },
  {
    path: 'modificar-curso/:id', component: PutCursoComponent
  },
  //Institucion
  {
    path: 'instituciones/:id', component: TablaInstitucionesComponent//, canActivate: [GuardGuard]
  },
>>>>>>> Stashed changes
  {
    path: 'cursos', component: CursosComponent
  },
  {
    path: 'cursos/:id', component: CursosFormComponent
  }
  
<<<<<<< Updated upstream
=======
  //Usuarios
  {
    path: "admin/usuarios", component: UsuarioComponent
  },
  {
    path: 'admin/nuevo-usuario', component: FormularioNuevoUsuarioComponent
  },
  {
    path: 'admin/modificar-usuario/:id', component: FormularioModificarUsuarioComponent
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
  //menu
  {
    path: 'profesores', component: MenuProfesoresComponent
  },

  //preguntas
  {
    path: 'preguntas', component: PreguntasComponent
  },
  {
    path: 'crear-pregunta', component: CrearPreguntaComponent
  },
  {
    path: 'modificar-pregunta/:id', component: ActualizarPreguntaComponent
  }
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
