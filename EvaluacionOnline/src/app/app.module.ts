import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlumnoDetailComponent } from './components/alumno-detail/alumno-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormUpdateComponent } from './components/admin/form-update/form-update.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    HomeComponent,
    LoginComponent,
    AlumnoDetailComponent,
    NavbarComponent,
    FormUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
