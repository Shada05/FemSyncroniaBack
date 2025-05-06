import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstruccionPage } from './construccion.page';

const routes: Routes = [
  {
    path: '',
    component: ConstruccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstruccionPageRoutingModule {}
