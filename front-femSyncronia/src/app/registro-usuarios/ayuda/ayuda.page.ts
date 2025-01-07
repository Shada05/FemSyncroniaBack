import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario con los controles necesarios
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de email
      categoria: ['', [Validators.required]], // Campo de categoría
      mensaje: ['', [Validators.required, Validators.minLength(10)]], // Campo de mensaje con validación adicional
    });
  }

  ngOnInit() {}

  // Función para manejar el envío del formulario
  enviarFormulario() {
    if (this.formulario.valid) {
      const email = this.formulario.get('email')?.value;
      const categoria = this.formulario.get('categoria')?.value;
      const mensaje = this.formulario.get('mensaje')?.value;
      console.log('Correo enviado:', email);
      console.log('Categoría seleccionada:', categoria);
      console.log('Mensaje:', mensaje);

      // Implementa aquí la lógica para enviar el correo con la categoría y mensaje
    } else {
      console.log('Formulario inválido');
    }
  }
}
