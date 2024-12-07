import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-datos-corporales',
  templateUrl: './datos-corporales.page.html',
  styleUrls: ['./datos-corporales.page.scss'],
})
export class DatosCorporalesPage implements OnInit {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      peso: ['', [Validators.required,this.validarMaxPeso]],
      estatura: ['', [Validators.required, this.validarMaxEstatura]],
      temperatura: ['', [Validators.required, this.validarMaxTemperatura]],
    });
  }

  ngOnInit() { }

  validarFormato(event: any, campo: string) {
    let value = event.target.value || '';
    value = value.replace(/[^0-9.]/g, '');

    const puntoIndex = value.indexOf('.');
    if (puntoIndex !== -1) {
      const [entero, decimal] = value.split('.');
      value = `${entero.slice(0, campo === 'temperatura' ? 2 : 3)}.${decimal.slice(0, 2)}`;
    } else {
      value = value.slice(0, campo === 'temperatura' ? 2 : 3);
    }

    event.target.value = value;
    this.formulario.get(campo)?.setValue(value);
  }

  // Validación de peso máximo
  validarMaxPeso(control: AbstractControl): ValidationErrors | null {
    const peso = parseFloat(control.value);
    if (peso > 150) {
      return { max: true };
    }
    return null;
  }

  // Validación de estatura máxima
  validarMaxEstatura(control: AbstractControl): ValidationErrors | null {
    const estatura = parseFloat(control.value);
    if (estatura > 200) {
      return { max: true };
    }
    return null;
  }

  // Validación de temperatura máxima
  validarMaxTemperatura(control: AbstractControl): ValidationErrors | null {
    const temperatura = parseFloat(control.value);
    if (temperatura > 45) {
      return { max: true };
    }
    return null;
  }
}
