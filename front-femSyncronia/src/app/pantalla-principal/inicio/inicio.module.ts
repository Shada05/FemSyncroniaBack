import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';

import { CalendarioCicloComponent } from 'src/app/componentes/calendario-ciclo/calendario-ciclo.component';
import { GraficaComponent } from 'src/app/componentes/grafica/grafica.component';
import { CiclosComponent } from 'src/app/componentes/ciclos/ciclos.component';
import { HistorialComponent } from 'src/app/componentes/historial/historial.component';
import { InformacionComponent } from 'src/app/componentes/informacion/informacion.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
  ],
  declarations: [InicioPage, CalendarioCicloComponent, GraficaComponent,CiclosComponent,HistorialComponent, 
                InformacionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InicioPageModule { }
