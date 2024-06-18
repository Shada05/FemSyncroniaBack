import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  usuario = {
    email: '',
    password: '',
    confirmarPassword: ''
  };

  passwordVisible = false;
  confirmarPasswordVisible = false;
  mostrarIconoPassword = false;
  mostrarIconoConfirmPassword = false;

  constructor() {}

  enviarDatos() {
    if (this.usuario.password === this.usuario.confirmarPassword) {
      console.log(this.usuario);
    } else {
      console.error('Las contraseñas no coinciden');
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
    if (campo === 'password') {
      this.mostrarIconoPassword = this.usuario.password.trim() !== '';
    } else if (campo === 'confirmarPassword') {
      this.mostrarIconoConfirmPassword = this.usuario.confirmarPassword.trim() !== '';
    }
  }

  validarContrasenas() {
    this.mostrarIconoPassword = this.usuario.password.trim() !== '';
    this.mostrarIconoConfirmPassword = this.usuario.confirmarPassword.trim() !== '';
  }

  ngOnInit() {}
}
