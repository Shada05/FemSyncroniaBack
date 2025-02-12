// En el componente CalendarioCicloComponent

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-calendario-ciclo',
  templateUrl: './calendario-ciclo.component.html',
  styleUrls: ['./calendario-ciclo.component.scss'],
})
export class CalendarioCicloComponent implements OnInit, OnChanges {
  @Input() mesActual: number = 0; // Asegúrate de que mesActual sea un número
  @Input() anoActual: number = 0; // Asegúrate de que anoActual sea un número
  diasSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  diasMes: { dia: number; tipo: string }[] = [];
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
    const primerDiaMes = new Date(this.anoActual, this.mesActual, 1); // mesActual debe ser un número
    const ultimoDiaMes = new Date(this.anoActual, this.mesActual + 1, 0); // mesActual debe ser un número

    // Obtener días del mes anterior
    const primerDiaSemana = primerDiaMes.getDay();
    const ultimoDiaMesAnterior = new Date(this.anoActual, this.mesActual, 0).getDate();

    for (let i = primerDiaSemana - 1; i >= 0; i--) {
      this.diasMes.push({ dia: ultimoDiaMesAnterior - i, tipo: 'anterior' });
    }

    // Rellenar días del mes actual
    for (let i = 1; i <= ultimoDiaMes.getDate(); i++) {
      this.diasMes.push({ dia: i, tipo: 'actual' });
    }

    // Obtener días del mes siguiente para completar 42 celdas
    const totalCeldas = 42;
    let diaSiguiente = 1;
    while (this.diasMes.length < totalCeldas) {
      this.diasMes.push({ dia: diaSiguiente++, tipo: 'siguiente' });
    }
  }
}
