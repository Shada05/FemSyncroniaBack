import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-calendario-ciclo',
  templateUrl: './calendario-ciclo.component.html',
  styleUrls: ['./calendario-ciclo.component.scss'],
})
export class CalendarioCicloComponent implements OnInit, OnChanges {
  @Input() mesActual: number = 0;
  @Input() anoActual: number = 0;
  @Input() fechaInicio: Date = new Date();
  @Input() fechaFin: Date = new Date();

  diasSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  diasMes: { dia: number; tipo: string; indice?: number | null }[] = [];
  fechaActual: Date;

  constructor() {
    this.fechaActual = new Date();
  }

  ngOnInit() {
    this.actualizarCalendario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mesActual'] || changes['anoActual'] || changes['fechaInicio'] || changes['fechaFin']) {
      this.actualizarCalendario();
    }
  }

  actualizarCalendario() {
    this.diasMes = [];
    const primerDiaMes = new Date(this.anoActual, this.mesActual, 1);
    const ultimoDiaMes = new Date(this.anoActual, this.mesActual + 1, 0);
    const primerDiaSemana = primerDiaMes.getDay();
    const ultimoDiaMesAnterior = new Date(this.anoActual, this.mesActual, 0).getDate();

    const diferenciaDias = Math.floor((this.fechaFin.getTime() - this.fechaInicio.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    let contadorIndice = (diferenciaDias - (primerDiaSemana % diferenciaDias)) % diferenciaDias;

    // Días del mes anterior
    for (let i = primerDiaSemana - 1; i >= 0; i--) {
      this.diasMes.push({
        dia: ultimoDiaMesAnterior - i,
        tipo: 'anterior',
        indice: (contadorIndice % diferenciaDias) + 1,
      });
      contadorIndice++;
    }

    // Días del mes actual
    for (let i = 1; i <= ultimoDiaMes.getDate(); i++) {
      this.diasMes.push({
        dia: i,
        tipo: 'actual',
        indice: (contadorIndice % diferenciaDias) + 1,
      });
      contadorIndice++;
    }

    // Días del mes siguiente
    let diaSiguiente = 1;
    while (this.diasMes.length < 42) {
      this.diasMes.push({
        dia: diaSiguiente++,
        tipo: 'siguiente',
        indice: (contadorIndice % diferenciaDias) + 1,
      });
      contadorIndice++;
    }
  }

  esHoy(diaObj: { dia: number; tipo: string }): boolean {
    const hoy = new Date();
    return diaObj.dia === hoy.getDate() &&
      diaObj.tipo === 'actual' &&
      this.mesActual === hoy.getMonth() &&
      this.anoActual === hoy.getFullYear();
  }
}
