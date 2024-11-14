import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentanosPageRoutingModule } from './cuentanos-routing.module';

import { CuentanosPage } from './cuentanos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentanosPageRoutingModule
  ],
  declarations: [CuentanosPage]
})
export class CuentanosPageModule {}
