import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorreoEnviadoPageRoutingModule } from './correo-enviado-routing.module';

import { CorreoEnviadoPage } from './correo-enviado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorreoEnviadoPageRoutingModule
  ],
  declarations: [CorreoEnviadoPage]
})
export class CorreoEnviadoPageModule {}
