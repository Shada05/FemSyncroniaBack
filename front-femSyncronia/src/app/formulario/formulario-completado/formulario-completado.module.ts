import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioCompletadoPageRoutingModule } from './formulario-completado-routing.module';

import { FormularioCompletadoPage } from './formulario-completado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioCompletadoPageRoutingModule
  ],
  declarations: [FormularioCompletadoPage]
})
export class FormularioCompletadoPageModule {}
