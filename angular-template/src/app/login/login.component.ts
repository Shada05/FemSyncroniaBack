import { Component, OnInit } from '@angular/core';
import { LoginService } from './longin.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  usuario = {
    email: '',
    password: ''
  };
  passwordVisible = false;
  mostrarIcono = false;

  constructor(/*private _loginService: LoginService, private router: Router*/) {

  }

  enviarDatos() {
    console.log(this.usuario)
  }

  alternarVisibilidadContrasena() {
    this.passwordVisible = !this.passwordVisible;
  }
  validarContrasena() {
    this.mostrarIcono = this.usuario.password.trim() !== '';
    
  }
  ngOnInit() {
    /*let token =  localStorage.getItem('token');
      // localStorage.getItem("token")
      if(token!=null){
        this.router.navigate(['/products']);
      }
      */
  }
  login() {
    /*console.log(this.username);
    console.log(this.password);
    const data={
      username: this.username,
      password: this.password
    }
    this._loginService.login(data).subscribe({next:(res)=>{
      console.log(res)
      localStorage.setItem("token",res.token) //valida el token
      this.router.navigate(['/products']); //redirige a productos
    },error:(err)=>{
      console.log(err)
      alert(err.error.message)
    }});*/
  }
}

