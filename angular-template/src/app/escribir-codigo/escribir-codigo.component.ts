import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-escribir-codigo',
  templateUrl: './escribir-codigo.component.html',
  styleUrls: ['./escribir-codigo.component.scss'],
})
export class EscribirCodigoComponent implements OnInit {
  formulario: FormGroup;

  @ViewChild('codigo1', { static: false }) codigo1: IonInput | null = null;
  @ViewChild('codigo2', { static: false }) codigo2: IonInput | null = null;
  @ViewChild('codigo3', { static: false }) codigo3: IonInput | null = null;
  @ViewChild('codigo4', { static: false }) codigo4: IonInput | null = null;
  @ViewChild('codigo5', { static: false }) codigo5: IonInput | null = null;
  @ViewChild('codigo6', { static: false }) codigo6: IonInput | null = null;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      codigo1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo6: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });
  }

  ngOnInit() {}

  moverFoco(inputActual: IonInput | null, siguienteInput: IonInput | null) {
    setTimeout(() => {
      if (inputActual?.value) {
        siguienteInput?.setFocus();
      }
    }, 100);
  }

  handleKeydown(event: KeyboardEvent, inputAnterior: IonInput | null, inputSiguiente: IonInput | null) {
    if (event.key === 'Backspace') {
      if ((event.target as HTMLInputElement).value === '') {
        if (inputAnterior) {
          inputAnterior.setFocus();
        }
      }
    }
  }

  soloNumeros(input: IonInput | null) {
    if (input) {
      // Asegúrate de que el valor sea tratado como una cadena
      const value = (input.value as string).replace(/[^0-9]/g, '');
      input.value = value;
    }
  }
  
}
