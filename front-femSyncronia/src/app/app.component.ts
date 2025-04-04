import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importa NavController y Platform
import { AuthService } from './services/auth.service';
import { PrimeraAperturaService } from './services/primera-apertura.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private primeraAperturaService: PrimeraAperturaService,
    private navCtrl: NavController, // Inyecta NavController
  ) { }

  async ngOnInit() {
    await SplashScreen.show({ autoHide: false });
  
    // Ejecutar verificaciones y esperar al menos 2 segundos
    await Promise.all([
      this.verificarPrimeraApertura(),
      new Promise(resolve => setTimeout(resolve, 2000)) // Mínimo 2 segundos
    ]);
  
    await SplashScreen.hide();
  }

  async showSplash() {
    // Show the splash for an indefinite amount of time:
    await SplashScreen.show({
      autoHide: false
    });
  }
  async verificarPrimeraApertura() {
    // Obtiene el estado de la primera apertura desde el servicio
    const esPrimeraVez = await this.primeraAperturaService.verificar();
    console.log('¿Es la primera vez?', esPrimeraVez);

    if (esPrimeraVez) {
      // Si es la primera vez, redirige a la pantalla de inicio
      this.navCtrl.navigateRoot('/inicio'); // Usa navigateRoot para eliminar el historial

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
          this.navCtrl.navigateRoot('/pantalla-principal'); // Usa navigateRoot para eliminar el historial
        },
        () => {
          // Si el token es inválido o expirado, redirige al login
          console.log('Token inválido o expirado, redirigiendo al login');
          this.navCtrl.navigateRoot('/login'); // Usa navigateRoot para eliminar el historial
        }
      );
    } else {
      // Si no hay token almacenado, redirige al login
      this.navCtrl.navigateRoot('/login'); // Usa navigateRoot para eliminar el historial
    }
  }
} 