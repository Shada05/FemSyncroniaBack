import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-escribir-codigo',
  templateUrl: './escribir-codigo.component.html',
  styleUrls: ['./escribir-codigo.component.scss'],
})

export class EscribirCodigoComponent implements OnInit {
  formulario: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      codigo: [null, [Validators.required, Validators.pattern('^[0-9]{6}$')]]  // Asegura que solo 6 dígitos numéricos sean aceptados
    });
  }
  
  // Función para permitir solo números
  validarSoloNumeros(event: any) {
    const patron = /[0-9.,]/;
    let caracterIngresado = String.fromCharCode(event.charCode);

    if (!patron.test(caracterIngresado)) {
      // Caracter inválido, prevenir la entrada
      event.preventDefault();
    }
  }
  ngOnInit() { }

}
