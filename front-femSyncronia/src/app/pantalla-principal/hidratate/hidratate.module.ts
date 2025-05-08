import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HidratatePageRoutingModule } from './hidratate-routing.module';

import { HidratatePage } from './hidratate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HidratatePageRoutingModule
  ],
  declarations: [HidratatePage]
})
export class HidratatePageModule {}
