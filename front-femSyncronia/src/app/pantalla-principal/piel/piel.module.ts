import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PielPageRoutingModule } from './piel-routing.module';

import { PielPage } from './piel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PielPageRoutingModule
  ],
  declarations: [PielPage]
})
export class PielPageModule {}
