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
    path: 'validar-codigo-regis',
    loadChildren: () => import('./registro-usuarios/validar-codigo/validar-codigo.module').then( m => m.ValidarCodigoPageModule)
  },
  {
    path: 'confirmacion-registro',
    loadChildren: () => import('./registro-usuarios/confirmacion/confirmacion.module').then( m => m.ConfirmacionPageModule)
  },
  {
    path: 'datos-personales',
    loadChildren: () => import('./registro-usuarios/datos-personales/datos-personales.module').then( m => m.DatosPersonalesPageModule)
  },
  {
    path: 'datos-guardados',
    loadChildren: () => import('./registro-usuarios/datos-guardados/datos-guardados.module').then( m => m.DatosGuardadosPageModule)
  },
  {
    path: 'cuentanos',
    loadChildren: () => import('./formulario/cuentanos/cuentanos.module').then( m => m.CuentanosPageModule)
  },
  {
    path: 'mi-anterior-ciclo',
    loadChildren: () => import('./formulario/mi-anterior-ciclo/mi-anterior-ciclo.module').then( m => m.MiAnteriorCicloPageModule)
  },
  {
    path: 'periodo',
    loadChildren: () => import('./formulario/periodo/periodo.module').then( m => m.PeriodoPageModule)
  },
  {
    path: 'datos-corporales',
    loadChildren: () => import('./formulario/datos-corporales/datos-corporales.module').then( m => m.DatosCorporalesPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./formulario/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'formulario-completado',
    loadChildren: () => import('./formulario/formulario-completado/formulario-completado.module').then( m => m.FormularioCompletadoPageModule)
  },
  {
    path: 'pantalla-principal',
    loadChildren: () => import('./pantalla-principal/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./registro-usuarios/ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'correo-enviado',
    loadChildren: () => import('./registro-usuarios/correo-enviado/correo-enviado.module').then( m => m.CorreoEnviadoPageModule)
  },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./pantalla-principal/mi-perfil/mi-perfil.module').then( m => m.MiPerfilPageModule)
  },
  {
    path: 'sintomas',
    loadChildren: () => import('./formulario/sintomas/sintomas.module').then( m => m.SintomasPageModule)
  },
  {
    path: 'registro-sintomas',
    children: [
      {
        path: '',
        loadChildren: () => import('./pantalla-principal/registro-sintomas/registro-sintomas.module').then(m => m.RegistroSintomasPageModule),
        data: { fecha: 'hoy' } // Valor por defecto
      },
      {
        path: ':fecha',
        loadChildren: () => import('./pantalla-principal/registro-sintomas/registro-sintomas.module').then(m => m.RegistroSintomasPageModule)
      },
      {
        path: ':fecha/:retraso',
        loadChildren: () => import('./pantalla-principal/registro-sintomas/registro-sintomas.module').then(m => m.RegistroSintomasPageModule)
      }
    ]
  },  
  {
    path: 'construccion',
    loadChildren: () => import('./pantalla-principal/construccion/construccion.module').then( m => m.ConstruccionPageModule)
  },
  {
    path: 'acerca',
    loadChildren: () => import('./pantalla-principal/acerca/acerca.module').then( m => m.AcercaPageModule)
  },  {
    path: 'notificaciones',
    loadChildren: () => import('./pantalla-principal/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pantalla-principal/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pantalla-principal/faq/faq.module').then( m => m.FaqPageModule)
  }


  
 


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
