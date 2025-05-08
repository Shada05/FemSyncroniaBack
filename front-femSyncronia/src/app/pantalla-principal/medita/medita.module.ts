import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeditaPageRoutingModule } from './medita-routing.module';

import { MeditaPage } from './medita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeditaPageRoutingModule
  ],
  declarations: [MeditaPage]
})
export class MeditaPageModule {}
