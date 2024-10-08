import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosGuardadosPage } from './datos-guardados.page';

const routes: Routes = [
  {
    path: '',
    component: DatosGuardadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosGuardadosPageRoutingModule {}
