import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnosComponent } from './components/admin/alumnos/alumnos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlumnoDetailComponent } from './components/alumno-detail/alumno-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormUpdateComponent } from './components/admin/update-alumno/form-update.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LogoutComponent } from './components/logout/logout.component';
import { CrearAlumnoComponent } from './components/admin/crear-alumno/crear-alumno.component';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
<<<<<<< HEAD
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
// import { InterceptorService } from './interceptors/interceptor.service';
=======
import { InstitucionComponent } from './components/admin/institucion/institucion.component';
import { InstitucionService } from './services/institucion.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InstitucionFormComponent } from './components/admin/form-institucion/form-institucion.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CursosService } from './services/cursos.service';
import { CursosComponent } from './components/admin/cursos/cursos.component';
import { CursosFormComponent } from './components/admin/form-cursos/form-cursos.component';
>>>>>>> bf6185a0a015fa87d517bebe9a1aa02067a5f24d

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'e4c91525-4209-4968-bd32-dd1530f43e4f', redirectUri: 'http://localhost:4200'
    }
  })
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
  ],
  imports: [
    BrowserModule,
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
    ToastrModule.forRoot({timeOut:2000, progressBar: true, progressAnimation:'decreasing', preventDuplicates: true}),
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: InterceptorService,
    //   multi: true
    // },
    // {
    //   provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory
    // },
    // MsalService
    {
<<<<<<< HEAD
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '941952913538-2rfqdi5edd11nbscroboc7fe1cannel8.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
=======
      provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory
    },
    MsalService,

    InstitucionService,
    CursosService
>>>>>>> bf6185a0a015fa87d517bebe9a1aa02067a5f24d
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
