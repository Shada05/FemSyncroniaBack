import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';

import { CalendarioCicloComponent } from 'src/app/componentes/calendario-ciclo/calendario-ciclo.component';
import { AnalisisTemperaturaComponent } from 'src/app/componentes/analisis-temperatura/analisis-temperatura.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
  ],
  declarations: [InicioPage, CalendarioCicloComponent,AnalisisTemperaturaComponent]
})
export class InicioPageModule { }
