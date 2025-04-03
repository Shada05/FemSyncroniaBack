import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {
  private isToastOpen = false;
  private loading: HTMLIonLoadingElement | null = null;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  // Mostrar el toast de advertencia
  async mostrarToastAdvertencia(mensaje: string) {
    if (this.isToastOpen) return;

    this.isToastOpen = true;
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'warning',
      position: 'bottom',
    });

    toast.onDidDismiss().then(() => {
      this.isToastOpen = false;
    });

    await toast.present();
  }

  // Mostrar el loading
  async mostrarLoading(message: string = 'Cargando...') {
    this.loading = await this.loadingController.create({
      message,
      spinner: 'crescent',
      cssClass: 'loading',
    });
    await this.loading.present();
  }

  // Ocultar el loading
  async ocultarLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}
