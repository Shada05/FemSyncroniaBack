import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../../api.service' // Importa el servicio
import { Router } from '@angular/router';

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
    private apiService: ApiService, // Inyecta el servicio
    private toastController: ToastController,
    private router: Router // Inyecta el Router

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

  enviarDatos() {
    if (this.formulario.valid) {
      const datos = this.formulario.value;
      delete datos.confirmarPassword; // Eliminar campo no necesario para la API

      this.apiService.createUsuario(datos).subscribe({
        next: async (response) => {
          console.log('Registro exitoso:', response);

          // Guarda el ID del usuario en localStorage
          if (response && response.id) {
            localStorage.setItem('usuarioId', response.id);
          }

          // Redirige solo después del registro exitoso
          this.router.navigate(['/validar-codigo-regis']);

          this.formulario.reset();
        },
        error: async (error) => {
          console.error('Error al registrar:', error);

          const toast = await this.toastController.create({
            message: 'Error al registrar. Intenta nuevamente.',
            duration: 2000,
            color: 'danger',
          });
          await toast.present();
        },
      });
    } else {
      console.error('Formulario inválido');
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
