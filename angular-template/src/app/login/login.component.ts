import { Component, OnInit } from '@angular/core';
import { LoginService } from './longin.service';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  formulario: FormGroup;
  passwordVisible = false;
  mostrarIcono = false;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  enviarDatos() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  alternarVisibilidadContrasena() {
    this.passwordVisible = !this.passwordVisible;
  }
  alternarIcono() {
    this.mostrarIcono = this.formulario.get('password')?.value.trim() !== '';
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

