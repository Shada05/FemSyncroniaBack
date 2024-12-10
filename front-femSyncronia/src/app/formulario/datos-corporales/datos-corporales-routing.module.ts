import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosCorporalesPage } from './datos-corporales.page';

const routes: Routes = [
  {
    path: '',
    component: DatosCorporalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosCorporalesPageRoutingModule {}
