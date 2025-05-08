import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router'; 
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-datos-corporales',
  templateUrl: './datos-corporales.page.html',
  styleUrls: ['./datos-corporales.page.scss'],
})
export class DatosCorporalesPage implements OnInit {
  formulario: FormGroup;
  userId: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private utilidadesService: UtilidadesService
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


  // Función para enviar los datos del formulario
  async enviarDatos() {
    if (!this.userId) {
      console.error('Error: No se puede actualizar sin un ID de usuario.');
      await this.utilidadesService.mostrarToastAdvertencia('Error: No se puede actualizar sin un ID de usuario');
      return;
    }

    // Verificar que el formulario sea válido
    if (this.formulario.invalid) {
      console.error('Por favor, completa todos los campos requeridos.');
      await this.utilidadesService.mostrarToastAdvertencia('Por favor, completa todos los campos requeridos');
      return;
    }

    try{
      await this.utilidadesService.mostrarLoading('Enviando datos...');
      // Obtener los datos del formulario y convertirlos a float
      const datosFormulario = this.formulario.value;

      const data = {
        weight: parseFloat(datosFormulario.peso), // Convertir a float
        temperature: parseFloat(datosFormulario.temperatura), // Convertir a float
      };

      // Llamar al servicio para actualizar los datos del usuario
      this.apiService.updateCycles(this.userId, data).subscribe({
        next: async (response) => {
          console.log('Usuario actualizado exitosamente:', response);
          await this.utilidadesService.ocultarLoading();
          this.router.navigate(['/sintomas']); // Navegar a la siguiente pantalla
        },
        error: async (error) => {
          console.error('Error al actualizar los datos:', error);
          await this.utilidadesService.ocultarLoading();
          await this.utilidadesService.mostrarToastAdvertencia('Error al enviar los datos. Intenta nuevamente');
        },
      });
    }catch(error){
      console.error('Error inesperado:', error);
      await this.utilidadesService.ocultarLoading();
      await this.utilidadesService.mostrarToastAdvertencia('Error inesperado. Intenta nuevamente');
    }
  }
}