import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeriodoPageRoutingModule } from './periodo-routing.module';

import { PeriodoPage } from './periodo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeriodoPageRoutingModule
  ],
  declarations: [PeriodoPage]
})
export class PeriodoPageModule {}
