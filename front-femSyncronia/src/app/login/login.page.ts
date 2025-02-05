import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formulario: FormGroup;
  passwordVisible = false;
  mostrarIcono = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() { }

  login() {
    if (this.formulario.valid) {
      const { email, password } = this.formulario.value;
  
      this.authService.login(email, password).subscribe(
        async (response) => {
          if (response?.token) {
            await this.authService.guardarToken(response.token);
            this.router.navigate(['/pantalla-principal']);
          } else {
            alert('Error: No se recibió un token válido.');
          }
        },
        (error) => {
          if (error.error?.message) {
            if (error.error.message === 'Usuario no encontrado.') {
              this.formulario.get('email')?.setErrors({ usuarioNoEncontrado: true });
            } else if (error.error.message === 'Contraseña incorrecta.') {
              this.formulario.get('password')?.setErrors({ contrasenaIncorrecta: true });
            }
          }
        }
      );
    }
  }

  alternarVisibilidadContrasena() {
    this.passwordVisible = !this.passwordVisible;
  }

  alternarIcono() {
    const passwordControl = this.formulario.get('password');
    this.mostrarIcono = passwordControl?.value.trim() !== '';
  }

  static usuarioNoEncontrado(control: AbstractControl): ValidationErrors | null {
    return control.value ? { usuarioNoEncontrado: true } : null;
  }

  static contrasenaIncorrecta(control: AbstractControl): ValidationErrors | null {
    return control.value ? { contrasenaIncorrecta: true } : null;
  }
}
