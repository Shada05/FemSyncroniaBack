import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'enviar-codigo',
    loadChildren: () => import('./recuperar-contrasena/enviar-codigo/enviar-codigo.module').then( m => m.EnviarCodigoPageModule)
  },
  {
    path: 'validar-codigo',
    loadChildren: () => import('./recuperar-contrasena/validar-codigo/validar-codigo.module').then( m => m.ValidarCodigoPageModule)
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./recuperar-contrasena/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },
  {
    path: 'confirmacion',
    loadChildren: () => import('./recuperar-contrasena/confirmacion/confirmacion.module').then( m => m.ConfirmacionPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro-usuarios/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'validar-codigo',
    loadChildren: () => import('./registro-usuarios/validar-codigo/validar-codigo.module').then( m => m.ValidarCodigoPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
