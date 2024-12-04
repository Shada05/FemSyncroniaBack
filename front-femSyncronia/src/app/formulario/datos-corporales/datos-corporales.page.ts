import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-datos-corporales',
  templateUrl: './datos-corporales.page.html',
  styleUrls: ['./datos-corporales.page.scss'],
})
export class DatosCorporalesPage implements OnInit {
  formulario: FormGroup; // Definición del formulario

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      peso: ['', [Validators.required,
      this.validarMaxNum
      ]],
      estatura: ['', [Validators.required,
      this.validarMaxNum
      ]],
      temperatura: ['', [Validators.required,
      this.validarMaxNum
      ]]
    }
    )
  }

  ngOnInit() { }

  validarMaxNum(control: AbstractControl): ValidationErrors | null {
    const numero = control.value;
    const esMenor = numero <= 45; // Compara si el número es menor o igual a 45

    if (!esMenor) {
      return { max: true }; // Si el número es mayor que 45, retorna el error
    }
    return null; // Si el número es válido, no retorna ningún error
  }

  soloNumeros(input: IonInput | null) {
    if (input) {
      const value = (input.value as string).replace(/[^0-9.]/g, '');
      input.value = value;
    }
  }
}
