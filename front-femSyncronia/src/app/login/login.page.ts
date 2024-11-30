import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formulario: FormGroup;
  passwordVisible = false;
  mostrarIcono = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  enviarDatos() {
    if (this.formulario.valid) {
      const { email, password } = this.formulario.value;
      this.apiService.login(email, password).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  alternarVisibilidadContrasena() {
    this.passwordVisible = !this.passwordVisible;
  }

  alternarIcono() {
    const passwordControl = this.formulario.get('password');
    if (passwordControl) {
      this.mostrarIcono = passwordControl.value.trim() !== '';
    }
  }

  ngOnInit() {}
}
