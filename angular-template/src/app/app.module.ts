import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { EnviarCodigoComponent } from './restablecerContrasena/enviar-codigo.component';
import { EscribirCodigoComponent } from './escribir-codigo/escribir-codigo.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent,
    LoginComponent,
    EnviarCodigoComponent,
    EscribirCodigoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot({}), //peticiones a las API'S
    ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
