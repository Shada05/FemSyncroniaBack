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
  contrasenasCoinciden = true;
  mostrarIconoConfirmPassword = false;

  constructor() { }
  enviarDatos() {
    console.log(this.usuario)
  }

  verContrasena(campo:string) {
    if (campo === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (campo === 'confirmarPassword') {
      this.confirmarPasswordVisible = !this.confirmarPasswordVisible;
    }
  }

  validarContrasenas() {
    this.contrasenasCoinciden = this.usuario.password === this.usuario.confirmarPassword;
  }
  ngOnInit() { }

}
