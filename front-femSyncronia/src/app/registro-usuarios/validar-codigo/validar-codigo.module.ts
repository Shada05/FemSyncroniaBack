import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidarCodigoPageRoutingModule } from './validar-codigo-routing.module';

import { ValidarCodigoPage } from './validar-codigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidarCodigoPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [ValidarCodigoPage]
})
export class ValidarCodigoPageModule {}
