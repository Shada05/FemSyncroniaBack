import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { PrimeraAperturaService } from './services/primera-apertura.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  // Tiempo mínimo que se mostrará el splash (en milisegundos)
  private readonly MIN_SPLASH_DURATION = 3000;
  private splashShownAt!: number;

  constructor(
    private authService: AuthService,
    private primeraAperturaService: PrimeraAperturaService,
    private navCtrl: NavController,
  ) { }

  async ngOnInit() {
    this.splashShownAt = Date.now();
    await this.showSplash();
    
    try {
      await this.verificarPrimeraApertura();
    } finally {
      await this.ensureMinSplashDuration();
      await SplashScreen.hide();
    }
  }

  private async showSplash() {
    await SplashScreen.show({
      autoHide: false,
      showDuration: this.MIN_SPLASH_DURATION
    });
  }

  private async ensureMinSplashDuration() {
    const elapsed = Date.now() - this.splashShownAt;
    const remaining = this.MIN_SPLASH_DURATION - elapsed;
    
    if (remaining > 0) {
      await new Promise(resolve => setTimeout(resolve, remaining));
    }
  }

  async verificarPrimeraApertura() {
    const esPrimeraVez = await this.primeraAperturaService.verificar();
    console.log('¿Es la primera vez?', esPrimeraVez);

    if (esPrimeraVez) {
      this.navCtrl.navigateRoot('/inicio');
      await this.primeraAperturaService.asignar(false);
    } else {
      await this.verificarAutenticacion();
    }
  }

  async verificarAutenticacion() {
    const token = await this.authService.obtenerToken();

    if (token) {
      this.authService.verificarToken(token).subscribe(
        () => this.navCtrl.navigateRoot('/pantalla-principal'),
        () => this.navCtrl.navigateRoot('/login')
      );
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }
}