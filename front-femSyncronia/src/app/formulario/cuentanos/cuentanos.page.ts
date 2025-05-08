import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-cuentanos',
  templateUrl: './cuentanos.page.html',
  styleUrls: ['./cuentanos.page.scss'],
})
export class CuentanosPage implements OnInit {
  anioActual: number = 0;
  anios: number[] = [];
  birthYear: number | null = null;
  whenYourPeriodCame: number | null = null;
  trackPeriod: string | null = null;
  regularPeriod: string | null = null;
  haveSymptoms: string | null = null;
  userId: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private utilidadesService: UtilidadesService
  ) { }

  ngOnInit() {
    this.anioActual = new Date().getFullYear();
    this.generarAnios();
    this.obtenerUsuarioId();
  }

  generarAnios() {
    const edadMinima = 11;
    const edadMaxima = 56;

    for (let edad = edadMinima; edad <= edadMaxima; edad++) {
      this.anios.push(this.anioActual - edad);
    }
  }

  async obtenerUsuarioId() {
    const token = await this.authService.obtenerToken();
    if (token) {
      this.authService.verificarToken(token).subscribe({
        next: (response) => {
          this.userId = response.user.id;
          console.log('ID obtenido del token:', this.userId);
        },
        error: async (error) => {
          console.error('Error al verificar el token:', error);
          await this.utilidadesService.mostrarToastAdvertencia('Error al obtener el ID de usuario');
        },
      });
    } else {
      console.log('No hay token almacenado.');
      await this.utilidadesService.mostrarToastAdvertencia('No se encontró token de autenticación');
    }
  }

  mapearSintomas(valor: string): number {
    switch (valor) {
      case 'no':
        return 0;
      case 'si':
        return 1;
      case 'no se':
        return 2;
      default:
        return 2;
    }
  }

  formatearFecha(anio: number | null): string {
    if (anio === null) {
      return '';
    }
    return `${anio}-01-01`;
  }

  async enviarDatos() {
    if (!this.userId) {
      console.error('Error: No se puede actualizar sin un ID de usuario.');
      await this.utilidadesService.mostrarToastAdvertencia('Error: No se puede actualizar sin un ID de usuario');
      return;
    }

    if (this.whenYourPeriodCame === null || this.haveSymptoms === null) {
      console.error('Por favor, completa todos los campos requeridos.');
      await this.utilidadesService.mostrarToastAdvertencia('Por favor, completa todos los campos requeridos');
      return;
    }

    try {
      await this.utilidadesService.mostrarLoading('Enviando datos...');

      const fechaFormateada = this.formatearFecha(this.whenYourPeriodCame);
      const haveSymptomsMapeado = this.mapearSintomas(this.haveSymptoms);

      const data = {
        when_your_period_came: fechaFormateada,
        Have_symptoms: haveSymptomsMapeado,
      };

      this.apiService.updateUsuario(this.userId, data).subscribe({
        next: async (response) => {
          console.log('Datos actualizados exitosamente:', response);
          await this.utilidadesService.ocultarLoading();
          this.router.navigate(['/mi-anterior-ciclo']);
        },
        error: async (error) => {
          console.error('Error al actualizar los datos:', error);
          await this.utilidadesService.ocultarLoading();
          await this.utilidadesService.mostrarToastAdvertencia('Error al enviar los datos. Intenta nuevamente');
        },
      });
    } catch (error) {
      console.error('Error inesperado:', error);
      await this.utilidadesService.ocultarLoading();
      await this.utilidadesService.mostrarToastAdvertencia('Error inesperado. Intenta nuevamente');
    }
  }
}