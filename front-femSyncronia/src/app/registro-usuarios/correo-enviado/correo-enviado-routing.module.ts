import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorreoEnviadoPage } from './correo-enviado.page';

const routes: Routes = [
  {
    path: '',
    component: CorreoEnviadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorreoEnviadoPageRoutingModule {}
