import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosGuardadosPageRoutingModule } from './datos-guardados-routing.module';

import { DatosGuardadosPage } from './datos-guardados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosGuardadosPageRoutingModule
  ],
  declarations: [DatosGuardadosPage]
})
export class DatosGuardadosPageModule {}
