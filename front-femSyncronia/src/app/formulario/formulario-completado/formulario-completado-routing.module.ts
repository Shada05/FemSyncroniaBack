import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioCompletadoPage } from './formulario-completado.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioCompletadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioCompletadoPageRoutingModule {}
