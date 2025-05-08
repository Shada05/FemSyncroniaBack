import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CodigoService } from 'src/app/services/codigo.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formulario: FormGroup;
  passwordVisible = false;
  confirmarPasswordVisible = false;
  mostrarIconoPassword = false;
  mostrarIconoConfirmPassword = false;
  
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private auth: AuthService,
    private codigoService: CodigoService,
    private utilidadesService: UtilidadesService
  ) {
    this.formulario = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          this.validarMayuscula,
          this.validarNumero,
          this.validarEspecial,
          this.validarNumCaracteres,
        ],
      ],
      confirmarPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() { }

  async registrar() {
    if (this.formulario.valid) {
      try {
        await this.utilidadesService.mostrarLoading('Registrando usuario...');
        const datos = this.formulario.value;
        delete datos.confirmarPassword;
        
        this.apiService.createUsuario(datos).subscribe({
          next: async (response) => {
            console.log('Registro exitoso:', response);
    
            if (response && response.id) {
              this.auth.register(response.id, response.email).subscribe(
                async (authResponse) => {
                  console.log('Usuario registrado con éxito', authResponse);
    
                  const token = authResponse.token;
                  if (token) {
                    await this.auth.guardarToken(token);
                    console.log('Token guardado en Storage');
                    await this.utilidadesService.ocultarLoading();
                    await this.enviarCodigoVerificacion(datos.email);
                  }
                },
                async (error) => {
                  console.error('Error al registrar usuario', error);
                  await this.utilidadesService.ocultarLoading();
                  await this.utilidadesService.mostrarToastAdvertencia('Error al registrar usuario');
                });
            }
    
            this.formulario.reset();
          },
          error: async (error) => {
            console.error('Error al registrar:', error);
            await this.utilidadesService.ocultarLoading();
            await this.utilidadesService.mostrarToastAdvertencia('Error al registrar. Intenta nuevamente.');
          },
        });
      } catch (error) {
        console.error('Error inesperado:', error);
        await this.utilidadesService.ocultarLoading();
        await this.utilidadesService.mostrarToastAdvertencia('Error inesperado. Intenta nuevamente.');
      }
    } else {
      this.utilidadesService.mostrarToastAdvertencia('Por favor completa el formulario correctamente.');
    }
  }

  async enviarCodigoVerificacion(email: string) {
    try {
      await this.utilidadesService.mostrarLoading('Enviando código de verificación...');
      const response = await this.codigoService.enviarCodigo(email).toPromise();
      console.log('Código de verificación enviado:', response);
      
      await this.utilidadesService.ocultarLoading();
      this.router.navigate(['/validar-codigo-regis']);
    } catch (error) {
      console.error('Error al enviar el código de verificación:', error);
      await this.utilidadesService.ocultarLoading();
      await this.utilidadesService.mostrarToastAdvertencia('Error al enviar el código de verificación. Intenta nuevamente.');
    }
  }

  alternarVisibilidadContrasena(campo: string) {
    if (campo === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (campo === 'confirmarPassword') {
      this.confirmarPasswordVisible = !this.confirmarPasswordVisible;
    }
  }

  alternarIcono(campo: string) {
    const control = campo === 'password' ? this.formulario.get('password') : this.formulario.get('confirmarPassword');
    if (control) {
      if (campo === 'password') {
        this.mostrarIconoPassword = control.value.trim() !== '';
      } else if (campo === 'confirmarPassword') {
        this.mostrarIconoConfirmPassword = control.value.trim() !== '';
      }
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmarPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (confirmPassword.value !== password.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }

  validarMayuscula(control: AbstractControl): ValidationErrors | null {
    const contrasena = control.value;
    const tieneMayuscula = /[A-Z]/.test(contrasena);

    if (!tieneMayuscula) {
      return { faltaMayuscula: true };
    }
    return null;
  }

  validarNumero(control: AbstractControl): ValidationErrors | null {
    const contrasena = control.value;
    const tieneNumero = /[0-9]/.test(contrasena);

    if (!tieneNumero) {
      return { faltaNumero: true };
    }
    return null;
  }

  validarNumCaracteres(control: AbstractControl): ValidationErrors | null {
    const contrasena = control.value;
    const esMayorOIgual = contrasena.length >= 8;

    if (!esMayorOIgual) {
      return { faltaLongitud: true };
    }
    return null;
  }

  validarEspecial(control: AbstractControl): ValidationErrors | null {
    const contrasena = control.value;
    const tieneEspecial = /[^A-Za-z0-9]/.test(contrasena);

    if (!tieneEspecial) {
      return { faltaEspecial: true };
    }
    return null;
  }
}