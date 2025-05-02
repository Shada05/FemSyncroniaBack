import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcercaPage } from './acerca.page';

const routes: Routes = [
  {
    path: '',
    component: AcercaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcercaPageRoutingModule {}
