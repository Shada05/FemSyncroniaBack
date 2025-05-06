import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TyCPage } from './ty-c.page';

const routes: Routes = [
  {
    path: '',
    component: TyCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TyCPageRoutingModule {}
