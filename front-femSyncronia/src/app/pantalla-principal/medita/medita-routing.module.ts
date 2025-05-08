import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeditaPage } from './medita.page';

const routes: Routes = [
  {
    path: '',
    component: MeditaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeditaPageRoutingModule {}
