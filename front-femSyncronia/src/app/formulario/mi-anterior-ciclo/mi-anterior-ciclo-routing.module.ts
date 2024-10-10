import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiAnteriorCicloPage } from './mi-anterior-ciclo.page';

const routes: Routes = [
  {
    path: '',
    component: MiAnteriorCicloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiAnteriorCicloPageRoutingModule {}
