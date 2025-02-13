// En el componente CalendarioCicloComponent

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-calendario-ciclo',
  templateUrl: './calendario-ciclo.component.html',
  styleUrls: ['./calendario-ciclo.component.scss'],
})
export class CalendarioCicloComponent implements OnInit, OnChanges {
  @Input() mesActual: number = 0;
  @Input() anoActual: number = 0;
  diasSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  diasMes: { dia: number; tipo: string, indice?: number | null }[] = [];
  fechaActual: Date;

  constructor() {
    this.fechaActual = new Date();
  }

  ngOnInit() {
    this.actualizarCalendario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mesActual'] || changes['anoActual']) {
      this.actualizarCalendario();
    }
  }

  actualizarCalendario() {
    this.diasMes = [];
    const primerDiaMes = new Date(this.anoActual, this.mesActual, 1);
    const ultimoDiaMes = new Date(this.anoActual, this.mesActual + 1, 0);
  
    // Obtener días del mes anterior
    const primerDiaSemana = primerDiaMes.getDay();
    const ultimoDiaMesAnterior = new Date(this.anoActual, this.mesActual, 0).getDate();
  
    // Agregar días del mes anterior
    for (let i = primerDiaSemana - 1; i >= 0; i--) {
      this.diasMes.push({ dia: ultimoDiaMesAnterior - i, tipo: 'anterior', indice: null }); // Sin índice
    }
  
    // Rellenar días del mes actual
    let contadorIndice = 1; // Iniciar el contador desde 1
    for (let i = 1; i <= ultimoDiaMes.getDate(); i++) {
      this.diasMes.push({ dia: i, tipo: 'actual', indice: contadorIndice++ }); // Índice para días actuales
    }
  
    // Obtener días del mes siguiente para completar 42 celdas
    const totalCeldas = 42;
    let diaSiguiente = 1;
    while (this.diasMes.length < totalCeldas) {
      this.diasMes.push({ dia: diaSiguiente++, tipo: 'siguiente', indice: null }); // Sin índice
    }
  }

  esHoy(diaObj: { dia: number; tipo: string }): boolean {
    const hoy = new Date();
    return diaObj.dia === hoy.getDate() && diaObj.tipo === 'actual' &&
      this.mesActual === hoy.getMonth() && this.anoActual === hoy.getFullYear();
  }
}
