import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeriodoPage } from './periodo.page';

const routes: Routes = [
  {
    path: '',
    component: PeriodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodoPageRoutingModule {}
