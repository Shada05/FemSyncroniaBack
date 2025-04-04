import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { CodigoService } from 'src/app/services/codigo.service';
import { Router } from '@angular/router';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-validar-codigo',
  templateUrl: './validar-codigo.page.html',
  styleUrls: ['./validar-codigo.page.scss'],
})
export class ValidarCodigoPage implements OnInit {
  formulario: FormGroup;
  correo: string = '';

  @ViewChild('codigo1', { static: false }) codigo1: IonInput | null = null;
  @ViewChild('codigo2', { static: false }) codigo2: IonInput | null = null;
  @ViewChild('codigo3', { static: false }) codigo3: IonInput | null = null;
  @ViewChild('codigo4', { static: false }) codigo4: IonInput | null = null;
  @ViewChild('codigo5', { static: false }) codigo5: IonInput | null = null;
  @ViewChild('codigo6', { static: false }) codigo6: IonInput | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private codigoService: CodigoService,
    private router: Router,
    private utilidadesService: UtilidadesService
  ) {
    this.formulario = this.fb.group({
      codigo1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo6: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });
  }

  ngOnInit() {
    this.obtenerCorreo();
  }

  moverFoco(inputActual: IonInput | null, siguienteInput: IonInput | null) {
    if (inputActual?.value && siguienteInput) {
      siguienteInput.setFocus();
    }
  }

handleKeydown(event: KeyboardEvent, inputAnterior: IonInput | null, inputSiguiente: IonInput | null) {
    const currentInput = event.target as HTMLInputElement;
    
    if (event.key === 'Backspace') {
      if (currentInput.value === '' && inputAnterior) {
        event.preventDefault();
        this.moverFocoConCursorAlFinal(inputAnterior);
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault(); // Siempre prevenir el comportamiento por defecto
      
      if (inputAnterior) {
        // Mover al input anterior si existe
        this.moverFocoConCursorAlFinal(inputAnterior);
      } else {
        // Estamos en el primer input - mantener cursor al inicio
        currentInput.setSelectionRange(0, 0);
      }
    } else if (event.key === 'ArrowRight') {
      event.preventDefault(); // Siempre prevenir el comportamiento por defecto
      
      if (inputSiguiente) {
        // Mover al input siguiente si existe
        this.moverFocoConCursorAlFinal(inputSiguiente);
      } else {
        // Estamos en el último input - mantener cursor al final
        currentInput.setSelectionRange(currentInput.value.length, currentInput.value.length);
      }
    } else if (/^[0-9]$/.test(event.key)) {
      if (currentInput.value && inputSiguiente) {
        setTimeout(() => this.moverFocoConCursorAlFinal(inputSiguiente!), 10);
      }
    }
  }

  private async moverFocoConCursorAlFinal(input: IonInput) {
    if (!input) return;
    
    try {
      await input.setFocus();
      const inputElement = await input.getInputElement();
      if (inputElement) {
        inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
      }
    } catch (error) {
      console.error('Error al mover el foco:', error);
    }
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text/plain').trim();

    if (clipboardData && /^\d{6}$/.test(clipboardData)) {
      const digits = clipboardData.split('');

      this.formulario.patchValue({
        codigo1: digits[0],
        codigo2: digits[1],
        codigo3: digits[2],
        codigo4: digits[3],
        codigo5: digits[4],
        codigo6: digits[5]
      });

      // Mover el foco al último input
      setTimeout(() => this.codigo6?.setFocus(), 10);
    }
  }

  soloNumeros(input: IonInput | null) {
    if (input) {
      const value = (input.value as string).replace(/[^0-9]/g, '');
      input.value = value;
    }
  }

  async obtenerCorreo() {
    try {
      const token = await this.authService.obtenerToken();
      if (token) {
        this.authService.verificarToken(token).subscribe(
          response => {
            this.correo = response.user.email;
            console.log('Correo obtenido del token:', this.correo);
          },
          error => {
            console.log('Error al obtener el correo:', error);
            this.utilidadesService.mostrarToastAdvertencia('Error al obtener el correo asociado');
          }
        );
      } else {
        console.log('No hay token almacenado.');
        this.utilidadesService.mostrarToastAdvertencia('No se encontró sesión activa');
      }
    } catch (error) {
      console.error('Error inesperado al obtener correo:', error);
      this.utilidadesService.mostrarToastAdvertencia('Error inesperado al obtener información');
    }
  }

  async reenviarCodigo() {
    if (!this.correo) {
      await this.utilidadesService.mostrarToastAdvertencia('No se encontró correo asociado');
      return;
    }

    try {
      await this.utilidadesService.mostrarLoading('Enviando código de verificación...');
      this.codigoService.enviarCodigo(this.correo).subscribe(
        async (response) => {
          console.log('Código de verificación enviado:', response);
          await this.utilidadesService.ocultarLoading();
          await this.utilidadesService.mostrarToastAdvertencia('Código enviado correctamente');
        },
        async (error) => {
          console.error('Error al enviar el código de verificación:', error);
          await this.utilidadesService.ocultarLoading();
          await this.utilidadesService.mostrarToastAdvertencia('Error al enviar el código. Intenta nuevamente.');
        }
      );
    } catch (error) {
      console.error('Error inesperado:', error);
      await this.utilidadesService.ocultarLoading();
      await this.utilidadesService.mostrarToastAdvertencia('Error inesperado. Intenta nuevamente.');
    }
  }

  async validarCodigo() {
    if (this.formulario.valid) {
      const codigo = Object.values(this.formulario.value).join('');
      console.log('Código ingresado:', codigo);

      try {
        await this.utilidadesService.mostrarLoading('Validando código...');
        this.codigoService.validarCodigo(this.correo, codigo).subscribe(
          async (response) => {
            if (response.valido) {
              console.log('Código válido:', response.mensaje);
              await this.utilidadesService.ocultarLoading();
              this.router.navigate(['/confirmacion-registro']);
            } else {
              await this.utilidadesService.ocultarLoading();
              await this.utilidadesService.mostrarToastAdvertencia(response.mensaje || 'Código inválido');
              this.marcarInputsComoInvalidos();
            }
          },
          async (error) => {
            const mensajeError = error.error.mensaje || 'Error al validar el código';
            console.error('Error al validar el código:', mensajeError);
            await this.utilidadesService.ocultarLoading();
            await this.utilidadesService.mostrarToastAdvertencia(mensajeError);
            this.marcarInputsComoInvalidos();
          }
        );
      } catch (error) {
        console.error('Error inesperado:', error);
        await this.utilidadesService.ocultarLoading();
        await this.utilidadesService.mostrarToastAdvertencia('Error inesperado. Intenta nuevamente.');
        this.marcarInputsComoInvalidos();
      }
    } else {
      this.utilidadesService.mostrarToastAdvertencia('Por favor ingresa un código válido de 6 dígitos');
      this.marcarInputsComoInvalidos();
    }
  }

  marcarInputsComoInvalidos() {
    Object.keys(this.formulario.controls).forEach(key => {
      const control = this.formulario.get(key);
      control?.setErrors({ 'invalid': true });
      control?.markAsTouched();
    });
  }
}