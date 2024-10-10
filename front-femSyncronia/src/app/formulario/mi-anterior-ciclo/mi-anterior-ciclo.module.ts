import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiAnteriorCicloPageRoutingModule } from './mi-anterior-ciclo-routing.module';

import { MiAnteriorCicloPage } from './mi-anterior-ciclo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiAnteriorCicloPageRoutingModule
  ],
  declarations: [MiAnteriorCicloPage]
})
export class MiAnteriorCicloPageModule {}
