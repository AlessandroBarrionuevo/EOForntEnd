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
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
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
  ],
  providers: [
    {
      provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
