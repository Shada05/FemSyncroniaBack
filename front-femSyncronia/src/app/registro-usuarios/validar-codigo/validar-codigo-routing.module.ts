import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidarCodigoPage } from './validar-codigo.page';

const routes: Routes = [
  {
    path: '',
    component: ValidarCodigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidarCodigoPageRoutingModule {}
