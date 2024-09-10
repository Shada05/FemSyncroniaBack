import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviarCodigoPageRoutingModule } from './enviar-codigo-routing.module';

import { EnviarCodigoPage } from './enviar-codigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviarCodigoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EnviarCodigoPage]
})
export class EnviarCodigoPageModule {}
