import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-mi-anterior-ciclo',
  templateUrl: './mi-anterior-ciclo.page.html',
  styleUrls: ['./mi-anterior-ciclo.page.scss'],
})
export class MiAnteriorCicloPage implements OnInit {
  formulario: FormGroup; // Definición del formulario

  meses: string[] = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];
  dias: number[] = [];
  maxDias: number = 45; // Límite máximo para el número de días
  dias1: number | string = ''; // Valor del primer input de días
  dias2: number | string = ''; // Valor del segundo input de días
  errorDias1: string = ''; // Mensaje de error para el primer input de días
  errorDias2: string = ''; // Mensaje de error para el segundo input de días

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      dias1: ['', [Validators.required,
        this.validarMaxNum
      ]],
      dias2: ['', [Validators.required,
        this.validarMaxNum
      ]],
    }
    )
  }

  ngOnInit() {}

  // Actualiza los días dependiendo del mes seleccionado
  actualizarDias(event: any) {
    const mesSeleccionado = event.detail.value;

    if (mesSeleccionado === 'Feb.') {
      this.dias = Array.from({ length: 28 }, (_, i) => i + 1); // 28 días para febrero
    } else if (['Abr.', 'Jun.', 'Sep.', 'Nov.'].includes(mesSeleccionado)) {
      this.dias = Array.from({ length: 30 }, (_, i) => i + 1); // 30 días para meses con 30 días
    } else {
      this.dias = Array.from({ length: 31 }, (_, i) => i + 1); // 31 días para los demás meses
    }
  }

  // Método para validar los días en los inputs
  validarDias(event: any, inputId: string) {
    const value = parseInt(event.target.value, 10);

    // Valida el valor ingresado
    if (!value) {
      if (inputId === 'dias1') {
        this.errorDias1 = 'Los días son requeridos.';
      } else if (inputId === 'dias2') {
        this.errorDias2 = 'Los días son requeridos.';
      }
    } else if (value > this.maxDias) {
      if (inputId === 'dias1') {
        this.errorDias1 = `Se ha excedido el número máximo de ${this.maxDias} días.`;
      } else if (inputId === 'dias2') {
        this.errorDias2 = `Se ha excedido el número máximo de ${this.maxDias} días.`;
      }
    } else {
      // Si el valor es válido, limpiamos el mensaje de error
      if (inputId === 'dias1') {
        this.errorDias1 = '';
      } else if (inputId === 'dias2') {
        this.errorDias2 = '';
      }
    }
  }

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
      const value = (input.value as string).replace(/[^0-9]/g, '');
      input.value = value;
    }
  }
}
