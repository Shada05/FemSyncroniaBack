import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilidadesService } from 'src/app/services/utilidades.service';

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
  isToastShowing: boolean = false; // Controla si ya se está mostrando un toast

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router, // Inyecta Router
    private apiService: ApiService, // Inyecta ApiService
    private utilidadesService: UtilidadesService // Inyecta ToastController
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
    const token = await this.authService.obtenerToken();
    if (token) {
      this.authService.verificarToken(token).subscribe({
        next: (response) => {
          this.userId = response.user.id;
          console.log('ID obtenido del token:', this.userId);
        },
        error: async (error) => {
          console.error('Error al verificar el token:', error);
          await this.utilidadesService.mostrarToastAdvertencia('Error al obtener el ID de usuario');
        },
      });
    } else {
      console.log('No hay token almacenado.');
      await this.utilidadesService.mostrarToastAdvertencia('No se encontró token de autenticación');
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

  // Función para convertir el nombre del mes a su representación numérica
  convertirMesANumero(mes: string): string {
    const meses = ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'];
    const index = meses.indexOf(mes);
    return (index + 1).toString().padStart(2, '0'); // Devuelve el mes en formato "01", "02", etc.
  }

  // Función para formatear la fecha en formato YYYY-MM-DD
  formatearFecha(mes: string, dia: number): string {
    const anioActual = new Date().getFullYear(); // Obtiene el año actual
    const mesFormateado = this.convertirMesANumero(mes); // Convierte el mes a número
    const diaFormateado = dia.toString().padStart(2, '0'); // Asegura que el día tenga dos dígitos
    return `${anioActual}-${mesFormateado}-${diaFormateado}`; // Formato YYYY-MM-DD
  }


  // Función para enviar los datos del formulario
  async crearCiclo() {
    if (this.formulario.invalid) {

      await this.utilidadesService.mostrarToastAdvertencia('Por favor, completa todos los campos requeridos');
      return;
    }

    // Obtén los valores del formulario
    const formData = this.formulario.value;
    console.log('Datos del formulario:', formData);

    // Formatear las fechas de inicio y fin
    const fechaInicio = this.formatearFecha(formData.mesInicio, formData.diaInicio);
    const fechaFin = this.formatearFecha(formData.mesFin, formData.diaFin);

    // Convertir dias1 y dias2 a enteros
    const dias1 = parseInt(formData.dias1, 10); // Convertir a entero
    const dias2 = parseInt(formData.dias2, 10); // Convertir a entero

    // Validar que la conversión sea exitosa
    if (isNaN(dias1) || isNaN(dias2)) {
      await this.utilidadesService.mostrarToastAdvertencia('Los valores de días deben ser números válidos');
      return;
    }
    try {
      await this.utilidadesService.mostrarLoading('Enviando datos...');

      const data = {
        cycle_status: 1,
        Start_day: fechaInicio,
        Finish_day: fechaFin,
        average_periodo: dias1,
        average_ciclo: dias2,
      };

      this.apiService.createCiclo(data).subscribe({
        next: async (response) => {
          console.log('Datos enviados exitosamente:', response);
          await this.utilidadesService.ocultarLoading();
          this.router.navigate(['/periodo']); // Navegar a la siguiente pantalla
        },
        error: async (error) => {
          console.error('Error al enviar los datos:', error);
          await this.utilidadesService.ocultarLoading();
          await this.utilidadesService.mostrarToastAdvertencia('Error al enviar los datos. Inténtalo de nuevo'); // Mostrar toast de error
        },
      });
    } catch (error) {

    }

  }
}