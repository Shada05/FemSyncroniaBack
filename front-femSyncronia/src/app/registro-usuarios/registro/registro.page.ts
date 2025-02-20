import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../../services/api.service'; // Importa el servicio
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CodigoService } from 'src/app/services/codigo.service'; // Importa el servicio de código

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
    private router: Router, // Inyecta el Router
    private auth: AuthService,
    private codigoService: CodigoService // Inyecta el servicio de código
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

  registrar() {
    if (this.formulario.valid) {
      const datos = this.formulario.value;
      delete datos.confirmarPassword;
  
      this.apiService.createUsuario(datos).subscribe({
        next: async (response) => {
          console.log('Registro exitoso:', response);
  
          // Guarda el ID del usuario en ionic storage
          if (response && response.id) {
            this.auth.register(response.id, response.email).subscribe(
              async (response) => {
                console.log('Usuario registrado con éxito', response);
  
                // Almacenar el token en Ionic Storage
                const token = response.token;
                if (token) {
                  await this.auth.guardarToken(token);
                  console.log('Token guardado en Storage');
                  // Enviar el código de verificación después de guardar el token
                  this.enviarCodigoVerificacion(datos.email);
                }
              },
              (error) => {
                console.error('Error al registrar usuario', error);
              });
          }
  
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

  // Función para enviar el código de verificación
  async enviarCodigoVerificacion(email: string) {
  try {
    const response = await this.codigoService.enviarCodigo(email).toPromise();
    console.log('Código de verificación enviado:', response);
    
    this.router.navigate(['/validar-codigo-regis']);
  } catch (error) {
    console.error('Error al enviar el código de verificación:', error);
    
    const toast = await this.toastController.create({
      message: 'Error al enviar el código de verificación. Intenta nuevamente.',
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
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
