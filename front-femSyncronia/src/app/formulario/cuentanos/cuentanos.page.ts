import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service'; // Importa el servicio ApiService
import { AuthService } from 'src/app/services/auth.service'; // Importa el servicio AuthService para obtener el ID del usuario
import { ToastController, LoadingController } from '@ionic/angular'; // Importa ToastController y LoadingController

@Component({
  selector: 'app-cuentanos',
  templateUrl: './cuentanos.page.html',
  styleUrls: ['./cuentanos.page.scss'],
})
export class CuentanosPage implements OnInit {
  anioActual: number = 0;
  anios: number[] = [];
  birthYear: number | null = null; // Año de nacimiento
  whenYourPeriodCame: number | null = null; // Año en que llegó el periodo
  trackPeriod: string | null = null; // Llevabas un registro regular
  regularPeriod: string | null = null; // Periodos regulares
  haveSymptoms: string | null = null; // Síntomas: "no", "si", "no se"
  userId: string | null = null; // ID del usuario
  isToastShowing: boolean = false; // Controla si ya se está mostrando un toast

  constructor(
    private apiService: ApiService, // Inyecta el servicio ApiService
    private authService: AuthService, // Inyecta el servicio AuthService
    private router: Router, // Inyecta el Router para navegar
    private toastController: ToastController, // Inyecta ToastController
    private loadingController: LoadingController // Inyecta LoadingController
  ) { }

  ngOnInit() {
    this.anioActual = new Date().getFullYear();
    this.generarAnios();
    this.obtenerUsuarioId();
  }

  generarAnios() {
    // Rango de edad: 11 a 56 años
    const edadMinima = 11;
    const edadMaxima = 56;

    for (let edad = edadMinima; edad <= edadMaxima; edad++) {
      this.anios.push(this.anioActual - edad);
    }
  }

  // Función para obtener el ID del usuario desde el token
  async obtenerUsuarioId() {
    const token = await this.authService.obtenerToken(); // Obtener el token
    if (token) {
      this.authService.verificarToken(token).subscribe({
        next: (response) => {
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

  // Función para mapear los valores de los radios a los valores que espera la API
  mapearSintomas(valor: string): number {
    switch (valor) {
      case 'no':
        return 0;
      case 'si':
        return 1;
      case 'no se':
        return 2;
      default:
        return 2; // Valor por defecto si no se selecciona nada
    }
  }

  // Función para formatear el año como un string en formato YYYY-MM-DD
  formatearFecha(anio: number | null): string {
    if (anio === null) {
      return ''; // Si no hay año seleccionado, devuelve un string vacío
    }
    return `${anio}-01-01`; // Formato YYYY-MM-DD, con mes y día predeterminados
  }

  // Función para mostrar un toast con un mensaje de error
  async mostrarToastError() {
    if (this.isToastShowing) {
      return; // Si ya se está mostrando un toast, no mostrar otro
    }

    this.isToastShowing = true; // Marcar que se está mostrando un toast

    const toast = await this.toastController.create({
      message: 'Ha ocurrido un error, inténtelo más tarde.', // Mensaje de error
      duration: 3000, // Duración de 3 segundos
      position: 'bottom', // Posición inferior
      color: 'danger', // Color rojo para indicar error
    });

    toast.onDidDismiss().then(() => {
      this.isToastShowing = false; // Marcar que el toast ya no se está mostrando
    });

    await toast.present();
  }

  // Función para mostrar un toast de advertencia cuando falten datos
  async mostrarToastAdvertencia() {
    if (this.isToastShowing) {
      return; // Si ya se está mostrando un toast, no mostrar otro
    }

    this.isToastShowing = true; // Marcar que se está mostrando un toast

    const toast = await this.toastController.create({
      message: 'Por favor, completa todos los campos requeridos.', // Mensaje de advertencia
      duration: 3000, // Duración de 3 segundos
      position: 'bottom', // Posición inferior
      color: 'warning', // Color amarillo para indicar advertencia
    });

    toast.onDidDismiss().then(() => {
      this.isToastShowing = false; // Marcar que el toast ya no se está mostrando
    });

    await toast.present();
  }

  // Función para enviar los datos al hacer clic en el botón "Continuar"
  async enviarDatos() {
    if (!this.userId) {
      console.error('Error: No se puede actualizar sin un ID de usuario.');
      return;
    }

    // Verificar que se hayan seleccionado los valores requeridos
    if (this.whenYourPeriodCame === null || this.haveSymptoms === null) {
      console.error('Por favor, completa todos los campos requeridos.');
      this.mostrarToastAdvertencia(); // Mostrar toast de advertencia
      return;
    }

    // Mostrar el spinner de carga con tema claro
    const loading = await this.loadingController.create({
      message: 'Enviando datos...', // Mensaje mientras se carga
      spinner: 'crescent', // Tipo de spinner
      cssClass: 'loading-light-theme', // Clase CSS personalizada para tema claro
    });
    await loading.present();

    // Formatear el año como un string en formato YYYY-MM-DD
    const fechaFormateada = this.formatearFecha(this.whenYourPeriodCame);

    // Mapear el valor de haveSymptoms antes de enviarlo
    const haveSymptomsMapeado = this.mapearSintomas(this.haveSymptoms);

    // Crear el objeto con los datos a enviar
    const data = {
      when_your_period_came: fechaFormateada, // Usar la fecha formateada
      have_symptoms: haveSymptomsMapeado, // Usar el valor mapeado
    };

    // Llamar al servicio para actualizar los datos del usuario
    this.apiService.updateUsuario(this.userId, data).subscribe({
      next: (response) => {
        console.log('Datos actualizados exitosamente:', response);
        loading.dismiss(); // Ocultar el spinner
        this.router.navigate(['/mi-anterior-ciclo']); // Navegar a la siguiente pantalla
      },
      error: (error) => {
        console.error('Error al actualizar los datos:', error);
        loading.dismiss(); // Ocultar el spinner
        this.mostrarToastError(); // Mostrar toast de error
      },
    });
  }
}