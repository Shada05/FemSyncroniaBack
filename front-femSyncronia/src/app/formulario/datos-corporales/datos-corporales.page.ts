import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastController, LoadingController } from '@ionic/angular'; // Importa ToastController y LoadingController
import { Router } from '@angular/router'; // Importa Router para navegar

@Component({
  selector: 'app-datos-corporales',
  templateUrl: './datos-corporales.page.html',
  styleUrls: ['./datos-corporales.page.scss'],
})
export class DatosCorporalesPage implements OnInit {
  formulario: FormGroup;
  userId: string | null = null; // ID del usuario
  isToastOpen = false; // Controla si ya se está mostrando un toast

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private toastController: ToastController, // Inyecta ToastController
    private loadingController: LoadingController, // Inyecta LoadingController
    private router: Router // Inyecta Router
  ) {
    this.formulario = this.fb.group({
      peso: ['', [Validators.required, this.validarMaxPeso]],
      estatura: ['', [Validators.required, this.validarMaxEstatura]],
      temperatura: ['', [Validators.required, this.validarMaxTemperatura]],
    });
  }

  ngOnInit() {
    this.obtenerUsuarioId();
  }

  // Función para validar el formato de los campos
  validarFormato(event: any, campo: string) {
    let value = event.target.value || '';
    value = value.replace(/[^0-9.]/g, '');

    const puntoIndex = value.indexOf('.');
    if (puntoIndex !== -1) {
      const [entero, decimal] = value.split('.');
      value = `${entero.slice(0, campo === 'temperatura' ? 2 : 3)}.${decimal.slice(0, 2)}`;
    } else {
      value = value.slice(0, campo === 'temperatura' ? 2 : 3);
    }

    event.target.value = value;
    this.formulario.get(campo)?.setValue(value);
  }

  // Validación de peso máximo
  validarMaxPeso(control: AbstractControl): ValidationErrors | null {
    const peso = parseFloat(control.value);
    if (peso > 150) {
      return { max: true };
    }
    return null;
  }

  // Validación de estatura máxima
  validarMaxEstatura(control: AbstractControl): ValidationErrors | null {
    const estatura = parseFloat(control.value);
    if (estatura > 200) {
      return { max: true };
    }
    return null;
  }

  // Validación de temperatura máxima
  validarMaxTemperatura(control: AbstractControl): ValidationErrors | null {
    const temperatura = parseFloat(control.value);
    if (temperatura > 45) {
      return { max: true };
    }
    return null;
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

  // Función para enviar los datos del formulario
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

    // Verificar que el formulario sea válido
    if (this.formulario.invalid) {
      console.error('Por favor, completa todos los campos requeridos.');
      this.mostrarToastAdvertencia('Por favor, completa todos los campos requeridos.'); // Mostrar toast de advertencia
      return;
    }

    // Mostrar el spinner de carga
    const loading = await this.loadingController.create({
      message: 'Enviando datos...', // Mensaje mientras se carga
      spinner: 'crescent', // Tipo de spinner
    });
    await loading.present();

    // Obtener los datos del formulario y convertirlos a float
    const datosFormulario = this.formulario.value;

    const data = {
      weight: parseFloat(datosFormulario.peso), // Convertir a float
      temperature: parseFloat(datosFormulario.temperatura), // Convertir a float
    };

    console.log('Datos a enviar:', data); // Depuración

    // Llamar al servicio para actualizar los datos del usuario
    this.apiService.updateCycles(this.userId, data).subscribe({
      next: async (response) => {
        console.log('Usuario actualizado exitosamente:', response);
        await loading.dismiss(); // Ocultar el spinner
        this.router.navigate(['/sintomas']); // Navegar a la siguiente pantalla
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