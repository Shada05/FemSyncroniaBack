import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
    const passwordControl = this.formulario.get('password');
    if (passwordControl) {
      this.mostrarIcono = passwordControl.value.trim() !== '';
    }
  }

  ngOnInit() {
  }

}
