import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosPersonalesPageRoutingModule } from './datos-personales-routing.module';

import { DatosPersonalesPage } from './datos-personales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosPersonalesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DatosPersonalesPage]
})
export class DatosPersonalesPageModule {}
