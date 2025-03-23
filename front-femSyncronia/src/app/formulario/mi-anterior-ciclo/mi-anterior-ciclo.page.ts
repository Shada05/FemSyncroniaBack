import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // Importa Router para navegar

@Component({
  selector: 'app-mi-anterior-ciclo',
  templateUrl: './mi-anterior-ciclo.page.html',
  styleUrls: ['./mi-anterior-ciclo.page.scss'],
})
export class MiAnteriorCicloPage implements OnInit {
  formulario: FormGroup; // Definición del formulario
  userId: string | null = null;
  meses: string[] = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];
  diasInicio: number[] = []; // Días disponibles para el inicio del periodo
  diasFin: number[] = []; // Días disponibles para el fin del periodo
  maxDias: number = 45; // Límite máximo para el número de días
  dias1: number | string = ''; // Valor del primer input de días
  dias2: number | string = ''; // Valor del segundo input de días
  errorDias1: string = ''; // Mensaje de error para el primer input de días
  errorDias2: string = ''; // Mensaje de error para el segundo input de días

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router // Inyecta Router
  ) {
    this.formulario = this.fb.group({
      mesInicio: ['', Validators.required], // Control para el mes de inicio
      diaInicio: ['', Validators.required], // Control para el día de inicio
      mesFin: ['', Validators.required], // Control para el mes de fin
      diaFin: ['', Validators.required], // Control para el día de fin
      dias1: ['', [Validators.required, this.validarMaxNum]],
      dias2: ['', [Validators.required, this.validarMaxNum]],
    });
  }

  ngOnInit() {
    this.obtenerUsuarioId();
  }

  async obtenerUsuarioId() {
    const token = await this.auth.obtenerToken();
    if (token) {
      this.auth.verificarToken(token).subscribe(
        (response) => {
          this.userId = response.user.id;
          console.log('ID obtenido del token:', this.userId);
        },
        (error) => {
          console.log('Error al obtener el ID:', error);
        }
      );
    } else {
      console.log('No hay token almacenado.');
    }
  }

  // Actualiza los días dependiendo del mes seleccionado
  actualizarDias(tipo: 'inicio' | 'fin') {
    const mesSeleccionado = tipo === 'inicio' 
      ? this.formulario.get('mesInicio')?.value 
      : this.formulario.get('mesFin')?.value;

    let dias: number[] = [];

    if (mesSeleccionado === 'Feb.') {
      dias = Array.from({ length: 28 }, (_, i) => i + 1); // 28 días para febrero
    } else if (['Abr.', 'Jun.', 'Sep.', 'Nov.'].includes(mesSeleccionado)) {
      dias = Array.from({ length: 30 }, (_, i) => i + 1); // 30 días para meses con 30 días
    } else {
      dias = Array.from({ length: 31 }, (_, i) => i + 1); // 31 días para los demás meses
    }

    if (tipo === 'inicio') {
      this.diasInicio = dias;
    } else {
      this.diasFin = dias;
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

  // Función para enviar los datos del formulario
  crearCiclo() {
    if (this.formulario.invalid) {
      console.log('Formulario inválido. Por favor, completa todos los campos requeridos.');
      return;
    }

    // Obtén los valores del formulario
    const formData = this.formulario.value;
    console.log('Datos del formulario:', formData);

    // Aquí puedes enviar los datos a tu API o realizar otras acciones
    // Ejemplo:
    const data = {
      id: this.userId,
      mesInicio: formData.mesInicio,
      diaInicio: formData.diaInicio,
      mesFin: formData.mesFin,
      diaFin: formData.diaFin,
      dias1: formData.dias1,
      dias2: formData.dias2,
    };

    console.log('Datos procesados:', data);

    // Navegar a la siguiente pantalla
    this.router.navigate(['/periodo']);
  }
}