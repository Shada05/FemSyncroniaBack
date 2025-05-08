import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HidratatePage } from './hidratate.page';

const routes: Routes = [
  {
    path: '',
    component: HidratatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HidratatePageRoutingModule {}
