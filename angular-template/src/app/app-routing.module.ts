import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guards';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';

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
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
  },
  {
    path: 'registro',
    component:RegistroComponent
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
