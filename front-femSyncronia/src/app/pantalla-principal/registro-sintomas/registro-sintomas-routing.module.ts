import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroSintomasPage } from './registro-sintomas.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroSintomasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroSintomasPageRoutingModule {}
