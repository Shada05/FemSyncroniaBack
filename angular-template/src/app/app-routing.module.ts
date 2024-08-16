import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guards';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { EnviarCodigoComponent } from './restablecerContrasena/enviar-codigo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },{
    path:'inicio',
    component:InicioComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'registro',
    component:RegistroComponent
  },{
    path: 'enviar-codigo',
    component:EnviarCodigoComponent
  },
/*
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products/:id',
    loadChildren: () => import('./product/product.module').then( m => m.ProductModule),
    canActivate: [AuthGuard]
  },
*/
  {
    path: '**', 
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
