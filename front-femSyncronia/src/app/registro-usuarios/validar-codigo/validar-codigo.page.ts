import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { CodigoService } from 'src/app/services/codigo.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private codigo: CodigoService,
    private router: Router,) {
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

      this.codigo.validarCodigo(this.correo, codigo).subscribe(
        response => {
          if (response.valido) {
            // Código correcto
            console.log('Código válido:', response.mensaje);
            // redirigir solo si es válido el codigo
            this.router.navigate(['/confirmacion-registro']);
          } else {
            // Código incorrecto o expirado
            console.log('Error:', response.mensaje);
            this.marcarInputsComoInvalidos(); // Marcar todos los inputs como inválidos
          }
        },
        error => {
          // Manejo de errores de la solicitud
          console.error('Error al validar el código:', error);
          this.marcarInputsComoInvalidos(); // Marcar todos los inputs como inválidos
        }
      );
    } else {
      console.log('El formulario no es válido.');
      this.marcarInputsComoInvalidos(); // Marcar todos los inputs como inválidos
    }
  }

  marcarInputsComoInvalidos() {
    // Marcar todos los controles del formulario como inválidos y tocados
    Object.keys(this.formulario.controls).forEach(key => {
      const control = this.formulario.get(key);
      control?.setErrors({ 'invalid': true }); // Agregar un error personalizado
      control?.markAsTouched(); // Marcar como tocado
    });
  }
}
