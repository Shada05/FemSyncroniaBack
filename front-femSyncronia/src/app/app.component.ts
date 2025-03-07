import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PrimeraAperturaService } from './services/primera-apertura.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private primeraAperturaService: PrimeraAperturaService,
    private router: Router
  ) { }

  async ngOnInit() {
    // Verifica si es la primera vez que se abre la aplicación
    await this.verificarPrimeraApertura();
  }

  async verificarPrimeraApertura() {
    // Obtiene el estado de la primera apertura desde el servicio
    const esPrimeraVez = await this.primeraAperturaService.verificar();
    console.log('¿Es la primera vez?', esPrimeraVez);

    if (esPrimeraVez) {
      // Si es la primera vez, redirige a la pantalla de inicio
      this.router.navigate(['/inicio']);

      // Marca que ya no es la primera vez
      await this.primeraAperturaService.asignar(false);
      console.log('Estado actualizado a:', await this.primeraAperturaService.obtener());
    } else {
      // Si no es la primera vez, verifica la autenticación del usuario
      await this.verificarAutenticacion();
    }
  }

  async verificarAutenticacion() {
    // Obtiene el token de autenticación almacenado
    const token = await this.authService.obtenerToken();

    if (token) {
      // Verifica si el token es válido
      this.authService.verificarToken(token).subscribe(
        () => {
          // Si el token es válido, redirige a la pantalla principal
          this.router.navigate(['/pantalla-principal']);
        },
        () => {
          // Si el token es inválido o expirado, redirige al login
          console.log('Token inválido o expirado, redirigiendo al login');
          this.router.navigate(['/login']);
        }
      );
    } else {
      // Si no hay token almacenado, redirige al login
      this.router.navigate(['/login']);
    }
  }
}
