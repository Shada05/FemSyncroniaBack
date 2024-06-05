import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule)
  },
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
  {
    path: '**', 
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
