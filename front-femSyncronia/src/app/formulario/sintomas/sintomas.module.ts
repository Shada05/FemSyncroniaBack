import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SintomasPageRoutingModule } from './sintomas-routing.module';
import { SintomasPage } from './sintomas.page';
import { SintomasContainerComponent } from 'src/app/componentes/sintomas-container/sintomas-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SintomasPageRoutingModule
  ],
  declarations: [SintomasPage, SintomasContainerComponent],
  exports: [SintomasContainerComponent]
})
export class SintomasPageModule { }
