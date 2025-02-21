import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroSintomasPageRoutingModule } from './registro-sintomas-routing.module';

import { RegistroSintomasPage } from './registro-sintomas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroSintomasPageRoutingModule
  ],
  declarations: [RegistroSintomasPage]
})
export class RegistroSintomasPageModule {}
