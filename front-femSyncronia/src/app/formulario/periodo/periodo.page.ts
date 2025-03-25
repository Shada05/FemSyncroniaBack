import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular'; // Importa LoadingController

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.page.html',
  styleUrls: ['./periodo.page.scss'],
})
export class PeriodoPage implements OnInit {

  @ViewChild('pielGroup') pielGroup!: IonRadioGroup;
  @ViewChild('pesoGroup') pesoGroup!: IonRadioGroup;
  @ViewChild('suenoGroup') suenoGroup!: IonRadioGroup;
  @ViewChild('energiaGroup') energiaGroup!: IonRadioGroup;
  @ViewChild('apetitoGroup') apetitoGroup!: IonRadioGroup;
  @ViewChild('humorGroup') humorGroup!: IonRadioGroup;
  userId: string | null = null;
  isToastOpen = false; // Controla si ya se está mostrando un toast

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private toastController: ToastController,
    private loadingController: LoadingController, // Inyecta LoadingController
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenerUsuarioId();
  }

  // Función para obtener el ID del usuario desde el token
  async obtenerUsuarioId() {
    const token = await this.authService.obtenerToken(); // Obtener el token
    if (token) {
      this.authService.verificarToken(token).subscribe({
        next: (response) => {
          console.log('Respuesta completa del servidor:', response); // Depuración
          this.userId = response.user.id; // Obtiene el ID del usuario desde el token
          console.log('ID obtenido del token:', this.userId);
        },
        error: (error) => {
          console.error('Error al verificar el token:', error);
        },
      });
    } else {
      console.log('No hay token almacenado.');
    }
  }

  // Función para mostrar un toast de advertencia
  async mostrarToastAdvertencia(mensaje: string) {
    if (this.isToastOpen) {
      return; // Si ya se está mostrando un toast, no mostrar otro
    }

    this.isToastOpen = true; // Marcar que se está mostrando un toast

    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'warning',
      position: 'bottom',
    });

    toast.onDidDismiss().then(() => {
      this.isToastOpen = false; // Marcar que el toast ya no se está mostrando
    });

    await toast.present();
  }

  async enviarDatos() {
    if (!this.userId) {
      console.error('Error: No se puede actualizar sin un ID de usuario.');
      const toast = await this.toastController.create({
        message: 'Error: No se pudo obtener el ID del usuario.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    // Verificar que se hayan seleccionado los valores requeridos
    if (!this.pielGroup.value || !this.pesoGroup.value || !this.suenoGroup.value || !this.energiaGroup.value || !this.apetitoGroup.value || !this.humorGroup.value) {
      console.error('Por favor, completa todos los campos requeridos.');
      this.mostrarToastAdvertencia('Por favor, completa todos los campos requeridos.'); // Mostrar toast de advertencia
      return;
    }

    // Mostrar el spinner de carga
    const loading = await this.loadingController.create({
      message: 'Enviando datos...', // Mensaje mientras se carga
      spinner: 'crescent', // Tipo de spinner
      duration: 2000, // Duración máxima (opcional)
    });
    await loading.present();

    // Crear el objeto con los datos a enviar
    const data = {
      Affects_skin: this.pielGroup.value,
      Affects_weight: this.pesoGroup.value,
      Affects_dream: this.suenoGroup.value,
      Affects_energy: this.energiaGroup.value,
      Affects_appetite: this.apetitoGroup.value,
      Affects_humour: this.humorGroup.value
    };

    console.log('Datos a enviar:', data); // Depuración

    // Llamar al servicio para actualizar los datos del usuario
    this.apiService.updateUsuario(this.userId, data).subscribe({
      next: async (response) => {
        console.log('Usuario actualizado exitosamente:', response);
        await loading.dismiss(); // Ocultar el spinner
        this.router.navigate(['/datos-corporales']);
      },
      error: async (error) => {
        console.error('Error al actualizar el usuario:', error);
        console.log('Respuesta completa del servidor:', error); // Depuración

        await loading.dismiss(); // Ocultar el spinner en caso de error

        const toast = await this.toastController.create({
          message: 'Error al registrar. Intenta nuevamente.',
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
      },
    });
  }
}