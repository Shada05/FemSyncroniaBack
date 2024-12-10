import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosCorporalesPageRoutingModule } from './datos-corporales-routing.module';

import { DatosCorporalesPage } from './datos-corporales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosCorporalesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DatosCorporalesPage]
})
export class DatosCorporalesPageModule {}
