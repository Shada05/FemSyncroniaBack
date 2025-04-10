import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

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

  diaSeleccionadoId: number | null = null;

  @Output() diaSeleccionado = new EventEmitter<{
    diaActual: number;
    indice: number;
  }>();

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
    if (
      changes['mesActual'] ||
      changes['anoActual'] ||
      changes['fechaInicio'] ||
      changes['fechaFin']
    ) {
      this.actualizarCalendario();
    }
  }

  actualizarCalendario() {
    this.diasMes = [];
    const primerDiaMes = new Date(this.anoActual, this.mesActual, 1);
    const ultimoDiaMes = new Date(this.anoActual, this.mesActual + 1, 0);
    const primerDiaSemana = primerDiaMes.getDay();
    const ultimoDiaMesAnterior = new Date(
      this.anoActual,
      this.mesActual,
      0
    ).getDate();

    // Calcular la diferencia total de días en el ciclo
    const diferenciaDias =
      Math.floor(
        (this.fechaFin.getTime() - this.fechaInicio.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    // Días del mes anterior
    for (let i = primerDiaSemana - 1; i >= 0; i--) {
      const dia = ultimoDiaMesAnterior - i;
      const fecha = new Date(this.anoActual, this.mesActual - 1, dia);
      const diffDias = Math.floor(
        (fecha.getTime() - this.fechaInicio.getTime()) / (1000 * 60 * 60 * 24)
      );
      const indice =
        (((diffDias % diferenciaDias) + diferenciaDias) % diferenciaDias) + 1;

      this.diasMes.push({
        dia: dia,
        tipo: 'anterior',
        indice: indice,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= ultimoDiaMes.getDate(); i++) {
      const fecha = new Date(this.anoActual, this.mesActual, i);
      const diffDias = Math.floor(
        (fecha.getTime() - this.fechaInicio.getTime()) / (1000 * 60 * 60 * 24)
      );
      const indice =
        (((diffDias % diferenciaDias) + diferenciaDias) % diferenciaDias) + 1;

      this.diasMes.push({
        dia: i,
        tipo: 'actual',
        indice: indice,
      });
    }

    // Días del mes siguiente
    let diaSiguiente = 1;
    while (this.diasMes.length < 42) {
      const fecha = new Date(this.anoActual, this.mesActual + 1, diaSiguiente);
      const diffDias = Math.floor(
        (fecha.getTime() - this.fechaInicio.getTime()) / (1000 * 60 * 60 * 24)
      );
      const indice =
        (((diffDias % diferenciaDias) + diferenciaDias) % diferenciaDias) + 1;

      this.diasMes.push({
        dia: diaSiguiente++,
        tipo: 'siguiente',
        indice: indice,
      });
    }

    // Buscar el día actual e índice
    const diaHoy = this.diasMes.find(
      (dia) =>
        dia.dia === this.fechaActual.getDate() &&
        dia.tipo === 'actual' &&
        this.mesActual === this.fechaActual.getMonth() &&
        this.anoActual === this.fechaActual.getFullYear()
    );

    if (diaHoy) {
      this.diaSeleccionado.emit({
        diaActual: diaHoy.dia,
        indice: diaHoy.indice ?? 1,
      });
    }
  }

  esHoy(diaObj: { dia: number; tipo: string }): boolean {
    const hoy = new Date();
    return (
      diaObj.dia === hoy.getDate() &&
      diaObj.tipo === 'actual' &&
      this.mesActual === hoy.getMonth() &&
      this.anoActual === hoy.getFullYear()
    );
  }

  seleccionarDia(diaObj: {
    dia: number;
    tipo: string;
    indice?: number | null;
  }) {
    // Solo permitir selección de días del mes actual
    if (diaObj.tipo !== 'actual') {
      return; // No hacer nada si no es del mes actual
    }

    // Generar un ID único para el día seleccionado
    this.diaSeleccionadoId =
      diaObj.dia + this.mesActual * 100 + this.anoActual * 10000;

    // Emitir el evento al componente padre
    this.diaSeleccionado.emit({
      diaActual: diaObj.dia,
      indice: diaObj.indice ?? 1,
    });
  }

  esDiaSeleccionado(diaObj: { dia: number; tipo: string }): boolean {
    const idDia = diaObj.dia + this.mesActual * 100 + this.anoActual * 10000;
    return this.diaSeleccionadoId === idDia && diaObj.tipo === 'actual';
  }
}
