import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { CodigoService } from 'src/app/services/codigo.service';
@Component({
  selector: 'app-validar-codigo',
  templateUrl: './validar-codigo.page.html',
  styleUrls: ['./validar-codigo.page.scss'],
})
export class ValidarCodigoPage implements OnInit {
  formulario: FormGroup;
  correo: string = '';

  @ViewChild('codigo1', { static: false }) codigo1: IonInput | null = null;
  @ViewChild('codigo2', { static: false }) codigo2: IonInput | null = null;
  @ViewChild('codigo3', { static: false }) codigo3: IonInput | null = null;
  @ViewChild('codigo4', { static: false }) codigo4: IonInput | null = null;
  @ViewChild('codigo5', { static: false }) codigo5: IonInput | null = null;
  @ViewChild('codigo6', { static: false }) codigo6: IonInput | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private codigo: CodigoService) {
    this.formulario = this.fb.group({
      codigo1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      codigo6: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });
  }

  ngOnInit() {
    this.obtenerCorreo();
  }

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
      const value = (input.value as string).replace(/[^0-9]/g, '');
      input.value = value;
    }
  }

  async obtenerCorreo() {
    const token = await this.authService.obtenerToken();
    if (token) {
      this.authService.verificarToken(token).subscribe(response => {
        this.correo = response.user.email;
        console.log('Correo obtenido del token:', this.correo);
      }, error => {
        console.log('Error al obtener el correo:', error);
      });
    } else {
      console.log('No hay token almacenado.');
    }
  }


  validarCodigo() {
    if (this.formulario.valid) {
      const codigo = Object.values(this.formulario.value).join('');
      console.log('Código ingresado:', codigo);

      this.codigo.validarCodigo(this.correo, codigo).subscribe(response => {

      });
    } else {
      console.log('El formulario no es válido.');
    }
  }
}
