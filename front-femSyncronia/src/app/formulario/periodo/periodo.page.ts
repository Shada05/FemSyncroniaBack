import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRadioGroup } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UtilidadesService } from 'src/app/services/utilidades.service';

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
    private router: Router,
    private utilidadesService: UtilidadesService
  ) { }

  ngOnInit() {
    this.obtenerUsuarioId();
  }

  // Función para obtener el ID del usuario desde el token
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


  async enviarDatos() {
    if (!this.userId) {
      console.error('Error: No se puede actualizar sin un ID de usuario.');
      await this.utilidadesService.mostrarToastAdvertencia('Error: No se puede actualizar sin un ID de usuario');
      return;
    }

    // Verificar que se hayan seleccionado los valores requeridos
    if (!this.pielGroup.value || !this.pesoGroup.value || !this.suenoGroup.value || !this.energiaGroup.value || !this.apetitoGroup.value || !this.humorGroup.value) {
      console.error('Por favor, completa todos los campos requeridos.');
      await this.utilidadesService.mostrarToastAdvertencia('Por favor, completa todos los campos requeridos');
      return;
    }

    try {
      await this.utilidadesService.mostrarLoading('Enviando datos...');
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
          await this.utilidadesService.ocultarLoading();
          this.router.navigate(['/datos-corporales']);
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