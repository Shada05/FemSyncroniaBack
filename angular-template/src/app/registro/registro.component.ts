import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  formulario: FormGroup; // Definición del formulario

  // Variables para manejar la visibilidad de contraseñas y los iconos
  passwordVisible = false;
  confirmarPasswordVisible = false;
  mostrarIconoPassword = false;
  mostrarIconoConfirmPassword = false;

  constructor(private fb: FormBuilder) {
    // Inicialización del formulario y definición de validaciones
    this.formulario = this.fb.group({
      username: ['', Validators.required], // Campo de usuario
      email: ['', [Validators.required, Validators.email]], // Campo de correo electrónico
      password: ['', [ // Campo de contraseña con varias validaciones
        Validators.required,
        Validators.minLength(8),
        this.validarMayuscula,
        this.validarNumero,
        this.validarEspecial
      ]],
      confirmarPassword: ['', Validators.required], // Campo de confirmar contraseña
      terms: [false, Validators.requiredTrue] // Checkbox de términos y condiciones
    }, { validators: this.passwordMatchValidator }); // Validador para la coincidencia de contraseñas
  }

  ngOnInit() { }

  // Método para enviar los datos del formulario
  enviarDatos() {
    if (this.formulario.valid) {
      console.log(this.formulario.value); // Envía los datos si el formulario es válido
    } else {
      console.error('Formulario inválido'); // Muestra un error si el formulario es inválido
    }
  }

  // Alternar visibilidad de contraseña
  alternarVisibilidadContrasena(campo: string) {
    if (campo === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (campo === 'confirmarPassword') {
      this.confirmarPasswordVisible = !this.confirmarPasswordVisible;
    }
  }

  // Alternar visibilidad del icono de contraseña
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

  // Validador de coincidencia de contraseñas
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

  // Validador para verificar si hay al menos una mayúscula en la contraseña
  validarMayuscula(control: AbstractControl): ValidationErrors | null {
    const contrasena = control.value;
    const tieneMayuscula = /[A-Z]/.test(contrasena); // Verifica si hay al menos una mayúscula

    if (!tieneMayuscula) {
      return { faltaMayuscula: true }; // Devuelve un error si no hay mayúscula
    }
    return null;
  }

  // Validador  para verificar si hay al menos un número en la contraseña
  validarNumero(control: AbstractControl): ValidationErrors | null {
    const contrasena = control.value;
    const tieneNumero = /[0-9]/.test(contrasena); // Verifica si hay al menos un número

    if (!tieneNumero) {
      return { faltaNumero: true }; // Devuelve un error si no hay número
    }
    return null;
  }

  // Validador  para verificar si hay al menos un carácter especial en la contraseña
  validarEspecial(control: AbstractControl): ValidationErrors | null {
    const contrasena = control.value;
    const tieneEspecial = /[^A-Za-z0-9]/.test(contrasena); // Verifica si hay al menos un carácter especial (no alfanumérico)

    if (!tieneEspecial) {
      return { faltaEspecial: true }; // Devuelve un error si no hay carácter especial
    }
    return null;
  }
}