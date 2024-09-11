import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarContrasenaPageRoutingModule } from './cambiar-contrasena-routing.module';

import { CambiarContrasenaPage } from './cambiar-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarContrasenaPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [CambiarContrasenaPage]
})
export class CambiarContrasenaPageModule { }
