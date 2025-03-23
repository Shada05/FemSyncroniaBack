import { Component, EventEmitter, Output, OnInit, Input, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss'],
})
export class GraficaComponent implements OnInit, OnDestroy {
  @Output() cerrarComponente = new EventEmitter<void>();
  @Input() yAxisLabels: string[] = [];
  @Input() minTemp!: number;
  @Input() maxTemp!: number;
  estaCerrando = false; 

  chart!: Chart;
  diasDelMes: string[] = [];
  datosTemperatura: (number | null)[] = [];
  diasMostrados: number = 16;
  ultimoDiaDelMes: number = 0;
  private intervaloActualizacion: any;
  dia: string = ''; // Cambiado a tipo string para incluir día y mes
  temperaturaActual: (number | null) = 0;

  // Meses abreviados
  mesesAbreviados: string[] = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  ngOnInit() {
    this.crearGrafica();
    // Actualizar la gráfica cada hora
    this.intervaloActualizacion = setInterval(() => {
      this.crearGrafica();
    }, 3600000); // 3600000 ms = 1 hora
  }

  ngOnDestroy() {
    if (this.intervaloActualizacion) {
      clearInterval(this.intervaloActualizacion);
    }
  }

  generarDiasDelMes() {
    const hoy = new Date();
    const mes = hoy.getMonth();
    const anio = hoy.getFullYear();
    const ultimoDia = new Date(anio, mes + 1, 0).getDate();
    this.ultimoDiaDelMes = ultimoDia;

    return Array.from({ length: ultimoDia }, (_, i) => (i + 1).toString());
  }

  simularDatosTemperatura() {
    const dias = this.generarDiasDelMes();
    return Array.from({ length: dias.length }, () => Math.floor(Math.random() * (41 - 35 + 1)) + 35);
  }

  actualizarIndicador() {
    const hoy = new Date().getDate();
    const indiceHoy = this.diasDelMes.indexOf(hoy.toString());
  
    if (indiceHoy === -1) return; // Si el día actual no está en la gráfica, no hacer nada
  
    const temperaturaHoy = this.datosTemperatura[indiceHoy];
    this.temperaturaActual = temperaturaHoy;
    let posicion = 0; // Posición en porcentaje
  
    // Ajustamos las condiciones de temperatura
    if (temperaturaHoy! < 36) {
      posicion = 0;
    } else if (temperaturaHoy! >= 36 && temperaturaHoy! < 37.5) {
      posicion = 25;
    } else if (temperaturaHoy! >= 38 && temperaturaHoy! < 39.5) {
      posicion = 50;
    } else if (temperaturaHoy! >= 39.5 && temperaturaHoy! < 41) {
      posicion = 75;
    } else {
      posicion = 95; // Temperatura >= 41
    }
  
    // Aseguramos que la posición no sea superior al 100%
    if (posicion > 100) {
      posicion = 100;
    }
  
    const indicador = document.querySelector('.indicador') as HTMLElement;
    if (indicador) {
      // Actualizamos la posición del indicador
      indicador.style.left = `${posicion}%`;
    }
  }

  crearGrafica() {
    const ctx = document.getElementById('graficaTemperatura') as HTMLCanvasElement;
    if (!ctx) return;

    const diasCompletos = this.generarDiasDelMes();
    const datosSimulados = this.simularDatosTemperatura();
    const hoy = new Date();
    const diaActual = hoy.getDate();
    const mesActual = hoy.getMonth(); // Mes actual (de 0 a 11)
    this.dia = `${diaActual} ${this.mesesAbreviados[mesActual]}`; // Guardamos día y mes abreviado como un string

    // Ajustar días mostrados según la fecha actual
    if (diaActual > this.diasMostrados) {
      const inicio = Math.max(1, diaActual - this.diasMostrados + 1);
      this.diasDelMes = Array.from({ length: this.diasMostrados }, (_, i) => (inicio + i).toString());
    } else {
      this.diasDelMes = diasCompletos.slice(0, this.diasMostrados);
    }

    // Ajustar datos al rango mostrado
    const indiceInicio = parseInt(this.diasDelMes[0]) - 1;
    const indiceFin = parseInt(this.diasDelMes[this.diasDelMes.length - 1]);
    this.datosTemperatura = datosSimulados.slice(indiceInicio, indiceFin);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.diasDelMes,
        datasets: [{
          label: 'Temperatura (°C)',
          data: this.datosTemperatura,
          borderColor: '#FF4D7F',
          borderWidth: 1,
          fill: false,
          pointStyle: "circle",
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: this.minTemp,
            max: this.maxTemp,
            ticks: {
              callback: (value) => (value === this.minTemp || value === this.maxTemp ? '' : value),
              stepSize: 1,
              precision: 0,
            }
          }
        }
      }
    });
    this.actualizarIndicador();
  }

  // Función para cerrar
  cerrar() {
    this.estaCerrando = true; // Activa la animación
    setTimeout(() => {
      this.cerrarComponente.emit(); // Emite el evento después de la animación
    }, 300); // Espera a que termine la animación (300ms)
  }
}