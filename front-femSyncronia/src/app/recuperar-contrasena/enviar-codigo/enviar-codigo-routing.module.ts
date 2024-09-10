import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviarCodigoPage } from './enviar-codigo.page';

const routes: Routes = [
  {
    path: '',
    component: EnviarCodigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviarCodigoPageRoutingModule {}
