import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss'],
})
export class GraficaComponent implements OnInit {
  @Output() cerrarComponente = new EventEmitter<void>();
  @Input() yAxisLabels: string[] = [];
  @Input() minTemp!: number;
  @Input() maxTemp!: number;

  chart!: Chart;

  // Variables para manejar el gráfico
  diasDelMes: string[] = [];
  datosTemperatura: (number | null)[] = [];
  diasMostrados: number = 16;
  ultimoDiaDelMes: number = 0;

  ngOnInit() {
    setTimeout(() => {
      this.crearGrafica();
    }, 0);
  }

  // Función para generar los días del mes actual
  generarDiasDelMes() {
    const hoy = new Date();
    const mes = hoy.getMonth(); // Obtiene el mes actual (0 es enero, 11 es diciembre)
    const anio = hoy.getFullYear();

    // Genera los días del mes
    const diasDelMes = [];
    const ultimoDia = new Date(anio, mes + 1, 0).getDate(); // Obtiene el último día del mes
    this.ultimoDiaDelMes = ultimoDia; // Guarda el último día del mes

    for (let i = 1; i <= ultimoDia; i++) {
      diasDelMes.push(i.toString());
    }

    return diasDelMes;
  }

  // Simulación de datos de temperatura
  simularDatosTemperatura() {
    const diasDelMes = this.generarDiasDelMes();
    const datosSimulados: { fecha: string, temperatura: number }[] = [];

    // Generar algunas fechas aleatorias con temperaturas aleatorias entre 35 y 41
    for (let i = 0; i < diasDelMes.length / 2; i++) {
      const dia = Math.floor(Math.random() * diasDelMes.length) + 1; // Día aleatorio del mes
      const temperatura = Math.floor(Math.random() * (41 - 35 + 1)) + 35; // Temperatura aleatoria entre 35 y 41
      const fecha = new Date(new Date().getFullYear(), new Date().getMonth(), dia).toISOString().split('T')[0]; // Fecha con formato 'YYYY-MM-DD'

      datosSimulados.push({ fecha, temperatura });
    }

    console.log("Datos simulados:", datosSimulados); // Imprimir los datos simulados en consola

    return datosSimulados;
  }

  crearGrafica() {
    const ctx = document.getElementById('graficaTemperatura') as HTMLCanvasElement;

    if (ctx) {
      const diasDelMes = this.generarDiasDelMes(); // Obtener los días del mes
      this.diasDelMes = diasDelMes.slice(0, this.diasMostrados); // Inicializamos solo los primeros 16 días

      // Simular la obtención de datos
      const datosSimulados = this.simularDatosTemperatura();

      // Procesar los datos simulados para crear el gráfico
      const datosProcesados = this.procesarDatosSimulados(datosSimulados);

      // Si los datos son menos que los días del mes, rellenamos con el último valor disponible
      if (datosProcesados.length < this.diasDelMes.length) {
        let lastValue = datosProcesados[datosProcesados.length - 1]; // Último valor conocido
        while (datosProcesados.length < this.diasDelMes.length) {
          datosProcesados.push(lastValue); // Rellenar con el último valor conocido
        }
      }

      // Reemplazar null con el último valor conocido en los datos
      for (let i = 1; i < datosProcesados.length; i++) {
        if (datosProcesados[i] === null) {
          datosProcesados[i] = datosProcesados[i - 1]; // Mantener el último valor
        }
      }

      // Agregar un día al final y restar uno al principio si el día actual es mayor que el número de días mostrados
      const hoy = new Date();
      const diaActual = hoy.getDate();

      if (diaActual > this.diasMostrados && this.diasDelMes.length < this.ultimoDiaDelMes) {
        // Obtener el siguiente día al último mostrado
        const siguienteDia = parseInt(this.diasDelMes[this.diasDelMes.length - 1], 10) + 1;

        // Agregar el siguiente día al final si no se excede el último día del mes
        if (siguienteDia <= this.ultimoDiaDelMes) {
          this.diasDelMes.push(siguienteDia.toString()); // Agregar el siguiente día al final
        }

        // Eliminar el primer día si el número de días mostrados supera el límite
        if (this.diasDelMes.length > this.diasMostrados) {
          this.diasDelMes.shift(); // Eliminar el primer día
        }
      }

      this.datosTemperatura = datosProcesados;

      // Crear el gráfico con los datos procesados
      if (this.chart) {
        this.chart.destroy(); // Destruir el gráfico anterior
      }
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.diasDelMes, // Usar los días del mes en el eje X
          datasets: [{
            label: 'Temperatura (°C)',
            data: this.datosTemperatura, // Usar los datos con valores reemplazados
            borderColor: '#FF4D7F',
            borderWidth: 1,
            fill: false,
            pointStyle: false,
            spanGaps: false // No permitir saltos en los gaps
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: this.minTemp, // Usar el valor mínimo proporcionado por el componente padre
              max: this.maxTemp, // Usar el valor máximo proporcionado por el componente padre
              ticks: {
                // Personaliza los ticks
                callback: (value) => {
                  // Ocultar los valores correspondientes a minTemp y maxTemp
                  if (value === this.minTemp || value === this.maxTemp) {
                    return ''; // No mostrar el valor en los extremos
                  }
                  return value; // Mostrar los valores en el rango intermedio
                },
                stepSize: 1, // El tamaño del paso en el eje Y
                precision: 0, // Sin decimales
              }
            }
          }
        }
      });
    }
  }

  // Función para procesar los datos simulados
  procesarDatosSimulados(datosSimulados: { fecha: string, temperatura: number }[]) {
    const datosProcesados: (number | null)[] = [];
    const diasDelMes = this.generarDiasDelMes();

    // Inicializamos el array de temperaturas con null
    for (let i = 0; i < diasDelMes.length; i++) {
      datosProcesados.push(null); // Inicializa todos los días con null
    }

    let primerValor: number | null = null;
    let primerDiaConValor: number = 0;

    // Asignar los valores de los datos simulados a las fechas correspondientes
    datosSimulados.forEach(dato => {
      const fecha = new Date(dato.fecha);
      const dia = fecha.getDate();
      if (dia <= diasDelMes.length) {
        datosProcesados[dia - 1] = dato.temperatura; // Asignar la temperatura al día correspondiente
      }
    });

    // Rellenar los días anteriores al primer valor con el primer valor encontrado
    for (let i = 0; i < datosProcesados.length; i++) {
      if (datosProcesados[i] !== null) {
        primerValor = datosProcesados[i];
        primerDiaConValor = i; // El día en que encontramos el primer valor
        break;
      }
    }

    // Si encontramos un primer valor, rellenamos hasta ese día con ese valor
    if (primerValor !== null && primerDiaConValor !== null) {
      for (let i = 0; i < primerDiaConValor; i++) {
        if (datosProcesados[i] === null) {
          datosProcesados[i] = primerValor; // Rellenar con el primer valor disponible
        }
      }
    }

    // Ahora, rellenamos los valores nulos después del primer valor encontrado por secuencia
    let ultimoValor: number | null = primerValor;

    for (let i = primerDiaConValor; i < datosProcesados.length; i++) {
      if (datosProcesados[i] === null && ultimoValor !== null) {
        datosProcesados[i] = ultimoValor; // Rellenar con el último valor conocido
      } else if (datosProcesados[i] !== null) {
        ultimoValor = datosProcesados[i]; // Actualizar el último valor conocido
      }
    }

    return datosProcesados;
  }

  cerrar() {
    this.cerrarComponente.emit();
  }
}
