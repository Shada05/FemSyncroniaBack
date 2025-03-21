import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';

import { CalendarioCicloComponent } from 'src/app/componentes/calendario-ciclo/calendario-ciclo.component';
import { GraficaComponent } from 'src/app/componentes/grafica/grafica.component';
import { CiclosComponent } from 'src/app/componentes/ciclos/ciclos.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
  ],
  declarations: [InicioPage, CalendarioCicloComponent, GraficaComponent,CiclosComponent]
})
export class InicioPageModule { }
