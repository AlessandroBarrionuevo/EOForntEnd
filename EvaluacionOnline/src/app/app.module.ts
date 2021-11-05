import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnosComponent } from './components/admin/Crud-Alumnos/alumnos/alumnos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlumnoDetailComponent } from './components/admin/Crud-Alumnos/alumno-detail/alumno-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormUpdateComponent } from './components/admin/Crud-Alumnos/update-alumno/form-update.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LogoutComponent } from './components/logout/logout.component';
import { CrearAlumnoComponent } from './components/admin/Crud-Alumnos/crear-alumno/crear-alumno.component';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { CursosComponent } from './components/admin/Gus/cursos/cursos.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from './interceptors/interceptor.service';
import { CursoComponent } from './components/admin/Crud-Cruso/curso/curso.component';
import { CreateCursoComponent } from './components/admin/Crud-Cruso/create-curso/create-curso.component';
import { PutCursoComponent } from './components/admin/Crud-Cruso/put-curso/put-curso.component';
import { TablaInstitucionesComponent } from './components/admin/Crud-Instituciones/Tabla-Instituciones/tabla-instituciones/tabla-instituciones.component';
import { CreateInstitucionesComponent } from './components/admin/Crud-Instituciones/Create-Instituciones/create-instituciones/create-instituciones.component';
import { PutInstitucionComponent } from './components/admin/Crud-Instituciones/Put-Institucion/put-institucion/put-institucion.component';
import { CursosFormComponent } from './components/admin/Gus/form-cursos/form-cursos.component';
import { InstitucionComponent } from './components/admin/Gus/institucion/institucion.component';
import { InstitucionFormComponent } from './components/admin/Gus/form-institucion/form-institucion.component';
import { FormularioNuevoUsuarioComponent } from './components/admin/Usuarios/formulario-nuevo-usuario/formulario-nuevo-usuario.component';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import { MateriaComponent } from './components/profesor/materia/materia.component';
import { ExamenesComponent } from './components/profesor/Crud-Examenes/examenes/examenes.component';
import { MenuProfesoresComponent } from './components/profesor/menu-profesores/menu-profesores.component';
import { CrearExamenComponent } from './components/profesor/Crud-Examenes/crear-examen/crear-examen.component';
import { ActualizarExamenComponent } from './components/profesor/Crud-Examenes/actualizar-examen/actualizar-examen.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'e4c91525-4209-4968-bd32-dd1530f43e4f',
      redirectUri: 'http://localhost:4200',
    },
  });
}

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    HomeComponent,
    LoginComponent,
    AlumnoDetailComponent,
    NavbarComponent,
    FormUpdateComponent,
    LogoutComponent,
    CrearAlumnoComponent,
    InstitucionComponent,
    InstitucionFormComponent,
    CursosComponent,
    CursosFormComponent,
    CursoComponent,
    CreateCursoComponent,
    PutCursoComponent,
    TablaInstitucionesComponent,
    CreateInstitucionesComponent,
    PutInstitucionComponent,
    FormularioNuevoUsuarioComponent,
    MateriaComponent,
    ExamenesComponent,
    MenuProfesoresComponent,
    CrearExamenComponent,
    ActualizarExamenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    MenubarModule,
    CalendarModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    SocialLoginModule,
    AuthModule.forRoot({
      domain: 'dev-ujo91807.us.auth0.com',
      clientId: 'ucFC7RwL2TMvmcU9CrkAyQkfmbPZkX2v',
      cacheLocation: 'localstorage',
      useRefreshTokens: true,
    }),
    MsalModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing',
      preventDuplicates: true,
    }),

    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '941952913538-2rfqdi5edd11nbscroboc7fe1cannel8.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
